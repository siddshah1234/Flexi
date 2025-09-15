// layout for different pages
import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="flex items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#E55837',
                    tabBarInactiveTintColor: '#cdcde0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84,
                    }
                }}>
                <Tabs.Screen
                    name="exercise"
                    options={{
                        title: "Exercise",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Exercise"
                                focused={focused}
                            />
                        ),
                        tabBarLabel: ({ focused, name, color }) => (
                            <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color: color }}>
                                Exercise
                            </Text>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="resources"
                    options={{
                        title: "Resources",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                name="Resources"
                                focused={focused}
                            />
                        ),
                        tabBarLabel: ({ focused, name, color }) => (
                            <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color: color }}>
                                Resources
                            </Text>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="AI"
                    options={{
                        title: "AI",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.ai}
                                color={color}
                                name="AI"
                                focused={focused}
                            />
                        ),
                        tabBarLabel: ({ focused, name, color }) => (
                            <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color: color }}>
                                AI
                            </Text>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="logout"
                    options={{
                        title: "Logout",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.logout}
                                color={color}
                                name="Logout"
                                focused={focused}
                            />
                        ),
                        tabBarLabel: ({ focused, name, color }) => (
                            <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color: color }}>
                                Logout
                            </Text>
                        ),
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout