import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Tab from "../../components/Tab/Tab";
import styles from "./styles";

const FriendScreen = () => {
  const [tab, setTab] = useState("following");
  const [activeTab, setActiveTab] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Tab title="Following" onPress={() => setTab("following")} />
        <Tab title="Followers" onPress={() => setTab("followers")} />
      </View>

      {tab === "following" ? (
        <View>
          <SubmitButton label="Add Friend" onPress={() => console.log('Add friend')} />
          <FlatList 
            style={{marginTop: 40, marginLeft: 20}}
            data={[
              {key: 'Devin'},
              {key: 'Dan'},
              {key: 'Dominic'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text style={{fontSize: 18, marginTop: 10}}>{item.key}</Text>}
          />
        </View>
      ) : (
        <Text>Followers</Text>
      )}
    </View>
  );
};

export default FriendScreen;
