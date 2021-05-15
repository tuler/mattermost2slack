// https://docs.mattermost.com/administration/bulk-export.html

export type TeamType = "0" | "I";

export type Team = {
    name: string;
    display_name: string;
    type: TeamType;
    description: string;
    allow_open_invite: boolean;
    scheme: string;
};

export type ChannelType = "0" | "P";

export type Channel = {
    team: string;
    name: string;
    display_name: string;
    type: ChannelType;
    header: string;
    purpose: string;
    scheme: string;
};

export type UserAuthentication =
    | "gitlab"
    | "ldap"
    | "saml"
    | "google"
    | "office365";

export type UserMessageDisplay = "clean" | "compact";

export type UserChannelDisplay = "full" | "centered";

export type ChannelNotifyProps = {
    desktop: string;
    mobile: string;
    mark_unread: string;
};

export type UserChannelMembership = {
    name: string;
    roles: string;
    notify_props: ChannelNotifyProps;
    favorite: boolean;
};

export type UserTeamMembership = {
    name: string;
    roles: string;
    theme: string;
    channels: UserChannelMembership[];
};

export type NotificationExtent = "all" | "mention" | "none";

export type UserNotifyProps = {
    desktop: NotificationExtent;
    desktop_sound: boolean;
    email: boolean;
    mobile: NotificationExtent;
    mobile_push_status: string;
    channel: string;
    comments: string;
    mention_keys: string;
};

export type User = {
    username: string;
    email: string;
    auth_service: UserAuthentication;
    auth_data: string;
    nickname: string;
    first_name: string;
    last_name: string;
    position: string;
    roles: string;
    locale: string;
    use_markdown_preview: boolean;
    use_formatting: boolean;
    show_unread_section: boolean;
    theme: string;
    military_time: boolean;
    collapse_previews: boolean;
    message_display: UserMessageDisplay;
    channel_display_mode: UserChannelDisplay;
    tutorial_step: string;
    email_interval: string;
    delete_at: number;
    teams: UserTeamMembership[];
    notify_props: UserNotifyProps;
};

export type Reply = {
    user: string;
    message: string;
    create_at: number;
};

export type Reaction = {
    user: string;
    emoji_name: string;
    create_at: number;
};

export type Emoji = {
    name: string;
    image: string;
};

export type Post = {
    team: string;
    channel: string;
    user: string;
    message: string;
    props: any;
    create_at: number;
    reactions: Reaction[];
    replies: Reply[];
};

export type DirectChannel = {
    members: string[];
    header: string;
};

export type DirectPost = {
    user: string;
    message: string;
    create_at: number;
};

export type RecordType =
    | "version"
    | "team"
    | "channel"
    | "user"
    | "post"
    | "direct_post";

export type Record = {
    type: RecordType;
};

export type TeamRecord = Record & {
    team: Team;
};

export type ChannelRecord = Record & {
    channel: Channel;
};

export type UserRecord = Record & {
    user: User;
};

export type PostRecord = Record & {
    post: Post;
};

export type DirectPostRecord = Record & {
    direct_post: DirectPost;
};
