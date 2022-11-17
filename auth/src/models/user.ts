import mongoose from "mongoose";
import bcrypt from 'bcrypt';


interface UserAttrs {
    email: string;
    password: string;
  }
  

  interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
  }
  
  interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
  }
  

  const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    },
    {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.password;
          delete ret.__v;
        }
      }
    }
  );
  
  userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
     const hashedPasword = await bcrypt.hash(this.get('password'),12)
     this.set('password',hashedPasword)
    }
    done();
  });

  userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
  };
  
  const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User}