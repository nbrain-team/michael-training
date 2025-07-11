import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  role: 'executive' | 'admin' | 'coach';
  subscription: {
    plan: 'free' | 'starter' | 'professional' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate: Date;
  };
  goals: Array<{
    id: string;
    title: string;
    description: string;
    targetDate: Date;
    status: 'active' | 'completed' | 'paused';
    progress: number;
    kpis: Array<{
      name: string;
      current: number;
      target: number;
      unit: string;
    }>;
  }>;
  preferences: {
    communicationStyle: string;
    focusAreas: string[];
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
  analytics: {
    lastLogin: Date;
    totalSessions: number;
    averageSessionDuration: number;
    questionsAsked: number;
    goalsCompleted: number;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['executive', 'admin', 'coach'],
    default: 'executive'
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'starter', 'professional', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: () => new Date(+new Date() + 30*24*60*60*1000) // 30 days
    }
  },
  goals: [{
    id: String,
    title: String,
    description: String,
    targetDate: Date,
    status: {
      type: String,
      enum: ['active', 'completed', 'paused'],
      default: 'active'
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    kpis: [{
      name: String,
      current: Number,
      target: Number,
      unit: String
    }]
  }],
  preferences: {
    communicationStyle: String,
    focusAreas: [String],
    timezone: {
      type: String,
      default: 'UTC'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    }
  },
  analytics: {
    lastLogin: Date,
    totalSessions: { type: Number, default: 0 },
    averageSessionDuration: { type: Number, default: 0 },
    questionsAsked: { type: Number, default: 0 },
    goalsCompleted: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema); 