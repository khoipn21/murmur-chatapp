import { useParams } from "react-router-dom";
import GuildList from "@layouts/guild/GuildList";
import DMSidebar from "@layouts/home/DMSidebar";
import FriendsDashboard from "@layouts/home/FriendsDashboard";
import AppLayout from "@layouts/AppLayout";
import ChatScreen from "@layouts/guild/chat/ChatScreen";
import DMHeader from "@layouts/home/DMHeader";
import MessageInput from "@layouts/guild/chat/MessageInput";
import { RouterProps } from "@models/routerProps";

function Home() {
	const { channelId } = useParams<keyof RouterProps>() as RouterProps;
	return (
		<AppLayout>
			<GuildList />
			<DMSidebar />
			{channelId === undefined ? (
				<FriendsDashboard />
			) : (
				<>
					<DMHeader />
					<ChatScreen />
					<MessageInput />
				</>
			)}
		</AppLayout>
	);
}

export default Home;
