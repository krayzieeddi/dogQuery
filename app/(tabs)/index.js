import { Image, StyleSheet, Platform, Text, View, FlatList} from 'react-native';
import { useQuery, QueryClient, QueryClientProvider  } from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function HomeScreen() {
  return (

    <QueryClientProvider client={queryClient}>
      <Dog />
      <DogGroup />
      <DogFacts />
      <DogId />
    </QueryClientProvider>
      
  );
}

function Dog() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['dogBreeds'],
    queryFn: async () => {
      const response = await fetch('https://dogapi.dog/api/v2/breeds');
      const json = await response.json();
      return json.data;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  return(
    <View style={styles.titleContainer}>
      <Text>Dog breeds</Text>
      <ul>
        {data.map(breed => <li key={breed.id}>{breed.attributes.name}</li>)}
      </ul>
    </View>
  )
}

function DogGroup() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['dogGroups'],
    queryFn: async () => {
      const response = await fetch('https://dogapi.dog/api/v2/groups');
      const json = await response.json();
      return json.data;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  return(
    <View style={styles.titleContainer}>
      <Text>Dog groups</Text>
      <ul>
        {data.map(groups => <li key={groups.id}>{groups.attributes.name}</li>)}
      </ul>
    </View>
  )
}

function DogFacts() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['dogFacts'],
    queryFn: async () => {
      const response = await fetch('https://dogapi.dog/api/v2/facts');
      const json = await response.json();
      return json.data;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  return(
    <View style={styles.titleContainer}>
      <Text>Dog Facts</Text>
      <ul>
        {data.map(facts => <li key={facts.id}>{facts.attributes.body}</li>)}
      </ul>
    </View>
  )
}

function DogId() {
  const dId = "dc5e84f8-9151-4624-836c-25b4e313118b"

  const { isLoading, error, data } = useQuery({
    queryKey: ['dogId'],
    queryFn: async () => {
      const response = await fetch(`https://dogapi.dog/api/v2/breeds/${dId}`);
      const json = await response.json();
      return json.data;
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  return(
    <View style={styles.titleContainer}>
      <Text>Dog ID</Text>
      <ul>
        {data.map(ID => <li key={ID.id}>{ID.attributes.name}</li>)}
      </ul>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

});
