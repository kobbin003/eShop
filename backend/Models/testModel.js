import mongoose, { model, Schema } from "mongoose";
const trialModelSchema = new Schema({
  name: String,
  password: String,
});
const TrialModel = model("TrialModel", trialModelSchema);
export default TrialModel;

/** creating document */
// document are instances of a model.
trial = new TrialModel({ name: "", password: "" });
