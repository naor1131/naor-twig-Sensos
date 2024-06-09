import { Group } from "../types";

const groupsStorageKey = "groups";

export function loadGroups(): Group[] {
  const groups: Group[] = JSON.parse(localStorage.getItem(groupsStorageKey) ?? "[]");
  return groups;
}

export function saveGroups(groups: Group[]) {
  const arrayAsString = JSON.stringify(groups);
  localStorage.setItem(groupsStorageKey, arrayAsString);
}
