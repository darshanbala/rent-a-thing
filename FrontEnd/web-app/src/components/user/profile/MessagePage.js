import { ChatEngine, getOrCreateChat, ChatFeed } from 'react-chat-engine'
import '../../../css/Chat.css'

export default function MessagePage({ user }) {

    console.log(user.first_name + user.id)
    // return <DirectChatPage user={`${user.first_name}${user.id}`} email={user.email}/>
    return <ChatEngine
        height='99vh'
        // userName={user}
        userName={`${user.first_name}${user.id}`}
        userSecret={user.email}
        // userName='Darshan1'
        // userSecret='darshan1@email.com'

        projectID='738df1f7-4780-4c48-b34f-0938273bcb5d'
        renderChatSettings={() => { }}
        renderNewChatForm={() => {}}
       
    // renderChatFeed={(chatAppState) => {}}

    //Test

    />
}

// 