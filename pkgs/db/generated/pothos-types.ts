/* eslint-disable */
import type { Prisma, Profile, Project, Media, MediaGroup } from "@prisma/client";
export default interface PrismaTypes {
    Profile: {
        Name: "Profile";
        Shape: Profile;
        Include: Prisma.ProfileInclude;
        Select: Prisma.ProfileSelect;
        OrderBy: Prisma.ProfileOrderByWithRelationInput;
        WhereUnique: Prisma.ProfileWhereUniqueInput;
        Where: Prisma.ProfileWhereInput;
        Create: {};
        Update: {};
        RelationName: "projects" | "medias" | "mediaGroups";
        ListRelations: "projects" | "medias" | "mediaGroups";
        Relations: {
            projects: {
                Shape: Project[];
                Name: "Project";
            };
            medias: {
                Shape: Media[];
                Name: "Media";
            };
            mediaGroups: {
                Shape: MediaGroup[];
                Name: "MediaGroup";
            };
        };
    };
    Project: {
        Name: "Project";
        Shape: Project;
        Include: Prisma.ProjectInclude;
        Select: Prisma.ProjectSelect;
        OrderBy: Prisma.ProjectOrderByWithRelationInput;
        WhereUnique: Prisma.ProjectWhereUniqueInput;
        Where: Prisma.ProjectWhereInput;
        Create: {};
        Update: {};
        RelationName: "creator";
        ListRelations: never;
        Relations: {
            creator: {
                Shape: Profile;
                Name: "Profile";
            };
        };
    };
    Media: {
        Name: "Media";
        Shape: Media;
        Include: Prisma.MediaInclude;
        Select: Prisma.MediaSelect;
        OrderBy: Prisma.MediaOrderByWithRelationInput;
        WhereUnique: Prisma.MediaWhereUniqueInput;
        Where: Prisma.MediaWhereInput;
        Create: {};
        Update: {};
        RelationName: "creator" | "MediaGroup";
        ListRelations: never;
        Relations: {
            creator: {
                Shape: Profile;
                Name: "Profile";
            };
            MediaGroup: {
                Shape: MediaGroup;
                Name: "MediaGroup";
            };
        };
    };
    MediaGroup: {
        Name: "MediaGroup";
        Shape: MediaGroup;
        Include: Prisma.MediaGroupInclude;
        Select: Prisma.MediaGroupSelect;
        OrderBy: Prisma.MediaGroupOrderByWithRelationInput;
        WhereUnique: Prisma.MediaGroupWhereUniqueInput;
        Where: Prisma.MediaGroupWhereInput;
        Create: {};
        Update: {};
        RelationName: "creator" | "medias";
        ListRelations: "medias";
        Relations: {
            creator: {
                Shape: Profile;
                Name: "Profile";
            };
            medias: {
                Shape: Media[];
                Name: "Media";
            };
        };
    };
}