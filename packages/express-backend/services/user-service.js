import userModel from "../models/user.js";

export function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (name && job) {
    promise = findUserByNameAndJob(name, job);
  }
  return promise;
}

function findUserByNameAndJob(name, job) {
    return userModel.find({ name, job });
}

export function findUserById(id) {
  return userModel.findById(id);
}

export function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

export function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
}