import{Tabs} from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout(){
    return(
        <Tabs
        screenOptions={{
                tabBarActiveTintColor:'#ae0e0eff',
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
                title:'Logistica',
                tabBarIcon:({ color,focused })=>(
                <MaterialCommunityIcons name={focused ? 'van-utility' : 'van-passenger'}color={color}size={24}/>
                ),
            }}
            />
            <Tabs.Screen name="about" options={{title:'Sobre Nos',tabBarIcon:({ color,focused })=>(
                <FontAwesome6 name={focused ? 'book' : 'book-bookmark'}color={color}size={24}/>
                ),}}></Tabs.Screen>
            
            <Tabs.Screen name="toDoList" options={{title:'Lista de Entregas',tabBarIcon:({ color,focused })=>(
                <MaterialCommunityIcons name={focused ? 'truck-delivery' : 'truck-delivery-outline'}color={color}size={24}/>
                ),}}></Tabs.Screen>
            <Tabs.Screen
                name="painel"
                options={{
                    title:'Painel',
                    tabBarIcon:({ color,focused })=>(
                        <MaterialCommunityIcons
                            name={focused ? 'view-dashboard' : 'view-dashboard-outline'}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen name="cep" options={{
                title:'CEP',
                tabBarIcon:({ color,focused })=>(
                <FontAwesome5 name={focused ? 'map-marked' : 'map-marked-alt'}color={color}size={24}/>
                ),
            }}
            />
            <Tabs.Screen name="imagem" options={{
                title:'IMAGEM',
                tabBarIcon:({ color,focused })=>(
                <Ionicons name={focused ? 'image' : 'image-outline'}color={color}size={24}/>
                ),
            }}
            />
        </Tabs>
    );
}
