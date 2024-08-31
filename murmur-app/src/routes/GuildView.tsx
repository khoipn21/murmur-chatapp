import Channels from "@layouts/guild/Channels";
import GuildList from "@layouts/guild/GuildList";
import ChannelHeader from "@layouts/guild/ChannelHeader";
import MessageInput from "@layouts/guild/chat/MessageInput";
import ChatScreen from "@layouts/guild/chat/ChatScreen";
import AppLayout from "@layouts/AppLayout";
import { settingsStore } from "@store/settingsStore";
import MemberList from "@layouts/guild/MemberList";

function GuildView() {
	const showMemberList = settingsStore((state) => state.showMembers);
	return (
		<AppLayout showLastColumn={showMemberList}>
			<GuildList />
			<Channels />
			<ChannelHeader />
			<ChatScreen />
			<MessageInput />
			{showMemberList && <MemberList />}
		</AppLayout>
	);
}

export default GuildView;
