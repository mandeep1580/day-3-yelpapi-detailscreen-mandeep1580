import React, {useState, useEffect} from 'react';
import { StyleSheet, View} from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';
import PriceResultList from '../components/PriceResultList';

const SearchScreen = () => {
    const [term, setTerm] = useState('')
    const [businesses, setBusinesses] = useState([]);
  
  //api call
  const searchAPI = async () => {
      const response = await yelp.get('/search', {
          params: {
            limit: 30,
            term: term,
            location: 'vancouver'
          }
      });
      setBusinesses(response.data.businesses)
      
    }

    useEffect(() => {
        searchAPI()
    }, [])
    console.log(businesses)

  return (
    <View>
    <SearchBar
      term={term}
      onTermChange={(newTerm) => setTerm(newTerm)} 
      onTermSubmit={() => searchAPI()}/>
      <PriceResultList results = {businesses} />
  </View>
  );
}


const styles = StyleSheet.create({});

export default SearchScreen;