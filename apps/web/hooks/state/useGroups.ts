/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export type GroupMessageType = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
  // receiverId?: string;
  // shouldShake?: boolean;
};

export enum MemberRole {
  ADMIN,
  GUEST,
}

export interface GroupListData {
  id: string;
  name: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  groupMember: GroupMember[];
}

export interface GroupMember {
  id: string;
  role?: MemberRole;
  memberId: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
}

interface GroupState {
  selectedGroup: GroupListData | null;
  groupMessage: GroupMessageType[];
  groupList: GroupListData[];
  setGroupList: (list: any) => void;
  setSelectedGroup: (grp: GroupListData | null) => void;
  setGroupMessage: (messages: GroupMessageType[]) => void;
}

const useGroups = create<GroupState>((set) => ({
  selectedGroupType: null,
  selectedGroup: null,
  groupMessage: [],
  groupList: [],
  setGroupList: (list) => set({ groupList: list }),
  setSelectedGroup: (grp) => set({ selectedGroup: grp }),
  setGroupMessage: (messages) => set({ groupMessage: messages }),
}));

interface Type {
  selectedType: type | null;
  setSelectedType: (type: type) => void;
}

export enum type {
  Group,
  Conversation,
}

export const useType = create<Type>((set) => ({
  selectedType: null,
  setSelectedType: (type) => set({ selectedType: type }),
}));

export default useGroups;
