export const foldersDummyData = [
  {
    id: "folder-1",
    user_id: "user-1",
    name: "ミニチュア",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-1",
      parent_folder: null,
      hasChild: true,
      level: "ONE",
    },
  },
  {
    id: "folder-2",
    user_id: "user-1",
    name: "ミニチュア作家",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-2",
      parent_folder: "folder-1",
      hasChild: true,
      level: "TWO",
    },
  },
  {
    id: "folder-3",
    user_id: "user-1",
    name: "国内",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-3",
      parent_folder: "folder-2",
      hasChild: false,
      level: "THREE",
    },
  },
  {
    id: "folder-4",
    user_id: "user-1",
    name: "Root Folder 2",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-4",
      parent_folder: null,
      hasChild: true,
      level: "ONE",
    },
  },
  {
    id: "folder-5",
    user_id: "user-1",
    name: "Sub Folder 2.1",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-5",
      parent_folder: "folder-4",
      hasChild: false,
      level: "TWO",
    },
  },
  {
    id: "folder-6",
    user_id: "user-1",
    name: "Root Folder 3",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-6",
      parent_folder: null,
      hasChild: true,
      level: "ONE",
    },
  },
  {
    id: "folder-7",
    user_id: "user-1",
    name: "Sub Folder 3.1",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-7",
      parent_folder: "folder-6",
      hasChild: true,
      level: "TWO",
    },
  },
  {
    id: "folder-8",
    user_id: "user-1",
    name: "Sub Folder 3.2",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-8",
      parent_folder: "folder-7",
      hasChild: false,
      level: "THREE",
    },
  },
  {
    id: "folder-9",
    user_id: "user-1",
    name: "Root Folder 4",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-9",
      parent_folder: null,
      hasChild: true,
      level: "ONE",
    },
  },
  {
    id: "folder-10",
    user_id: "user-1",
    name: "Sub Folder 4.1",
    created_at: new Date(),
    updated_at: new Date(),
    folderRelations: {
      id: "folder-10",
      parent_folder: "folder-9",
      hasChild: false,
      level: "TWO",
    },
  },
];

export const folderRelationsDummyData = [
  {
    id: "folder-1",
    parent_folder: null,
    hasChild: true,
    level: "ONE",
  },
  {
    id: "folder-2",
    parent_folder: "folder-1",
    hasChild: false,
    level: "TWO",
  },
  {
    id: "folder-3",
    parent_folder: "folder-1",
    hasChild: false,
    level: "TWO",
  },
  {
    id: "folder-4",
    parent_folder: null,
    hasChild: true,
    level: "ONE",
  },
  {
    id: "folder-5",
    parent_folder: "folder-4",
    hasChild: false,
    level: "TWO",
  },
  {
    id: "folder-6",
    parent_folder: null,
    hasChild: true,
    level: "ONE",
  },
  {
    id: "folder-7",
    parent_folder: "folder-6",
    hasChild: false,
    level: "TWO",
  },
  {
    id: "folder-8",
    parent_folder: "folder-6",
    hasChild: false,
    level: "TWO",
  },
  {
    id: "folder-9",
    parent_folder: null,
    hasChild: true,
    level: "ONE",
  },
  {
    id: "folder-10",
    parent_folder: "folder-9",
    hasChild: false,
    level: "TWO",
  },
];
