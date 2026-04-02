import{Tabs} from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabLayout(){
    return(
        <Tabs
        screenOptions={{
                tabBarActiveTintColor:'#613dffff',
                headerStyle:{
                    backgroundColor:'#ce1313ff',
                    
                },
                headerShadowVisible:false,
                headerTintColor:'#fff',
                tabBarStyle:{
                    backgroundColor:'#000000ff'
                },
            }}
        >
            
            <Tabs.Screen name="index" options={{
                title:'Home',
                tabBarIcon:({ color,focused })=>(
                <MaterialCommunityIcons name={focused ? 'van-utility' : 'van-passenger'}color={color}size={24}/>
                ),
            }}
            />
            <Tabs.Screen name="about" options={{title:'Sobre',tabBarIcon:({ color,focused })=>(
                <FontAwesome6 name={focused ? 'book' : 'book-bookmark'}color={color}size={24}/>
                ),}}></Tabs.Screen>
        </Tabs>
    );
}