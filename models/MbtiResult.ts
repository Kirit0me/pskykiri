import mongoose, { Schema, Document } from "mongoose";

export interface IMbtiResult extends Document {
  user_id: string;
  result: Record<string, any>;
  updated_at: Date;
}

const MbtiResultSchema = new Schema<IMbtiResult>({
  user_id: { type: String, required: true, unique: true },
  result: { type: Object, required: true },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.MbtiResult ||
  mongoose.model<IMbtiResult>("MbtiResult", MbtiResultSchema);
