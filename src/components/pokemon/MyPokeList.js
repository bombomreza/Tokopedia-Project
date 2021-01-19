import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import { connect } from "react-redux";
import { 
  fetchMyPokeAction, 
  deleteMyPokemon,
  releaseMyPokemon
} from "../../redux/actions";
import axios from 'axios';
import { api_url } from '../../helpers/api_url';

const AppWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  `
const AppHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: 200px;
  padding: 10px;
`
const HeaderTitle = styled.div`
  color: #fff;
  font-size: 32px;
  text-transform: uppercase;
  font-weight: 900;
  line-height:1;
`
const HeaderSubtitle = styled.div`
  color: #fff;
  font-size: 28px;
  text-transform: uppercase;
  font-weight: 300;
  line-weight: 1;
`
const AppSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
`
const PokeCard = styled.div`
  width: 300px;
  height: 250px;
  background: white;
  border-radius: 25px;
  margin: 10px;
  

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

`
const CardHeader = styled.div`
  width:100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

`
const CardSection = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content:center;
`
const ImgWrap = styled.div`
  width: 40%;
  height: 150px;
  display:flex;
  justify-content: center;
  align-items: center;
`
const ImgPoke = styled.img`
  width : 100px;
  height: 100px;

`
const DetailWrap = styled.div`
  width: 60%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

`
const DetailQue = styled.div`
  width: 50%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: flex-end;
`
const DetailAns = styled.div`
  width: 50%;
  height: 145px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: flex-start;
  margin-left: 5px;
`
const QuePoke = styled.h5`
  font-size: 1rem;
`
const AnsPoke = styled.h5`
  font-size: 1rem;
`
const CardFooter = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`
const FooterRemove = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FooterRelease = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const RemoveButton = styled.button`
  width: 100px;
  height: 35px;;
  background: red;
  border-radius: 5px;
`
const ReleaseButton = styled.button`
  width: 100px;
  height: 35px;;
  background: yellow;
  border-radius:5px;
`
function MyPokemon(props) {
  const [ownedpoke, setOwned] = useState(0)
  
  useEffect(() => {
    props.fetchMyPokeAction()
  }, [])

  const deletePoke = (id, pokemonIndex ) => {
    axios.get(`${api_url}/pokemonlist/${pokemonIndex}`)
      .then((res) => {setOwned(res.data.owned) })
    props.deleteMyPokemon(id, pokemonIndex, ownedpoke)
  }  
  const releasePoke = (id) => {
    props.releaseMyPokemon(id)

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchMyPokeAction()
  }

  return ( 
    <AppWrapper>
      <AppHeader>
        <HeaderTitle> My Pokemon List</HeaderTitle>
        <HeaderSubtitle>Let's Get Battle</HeaderSubtitle>
      </AppHeader>
      
      <AppSection>
        {props.pokeList.map((pokemon) => (
          <PokeCard key={pokemon.id} style={{opacity:1}} onSubmit={handleSubmit}>
            <CardHeader >
              {pokemon.id}
            </CardHeader>
            <CardSection>
              <ImgWrap>
                <ImgPoke src={pokemon.imageUrl} alt="" />
              </ImgWrap>
              <DetailWrap>
                <DetailQue>
                  <QuePoke>NickName:</QuePoke>
                  <QuePoke>WildName:</QuePoke>
                  <QuePoke>Status:</QuePoke>
                </DetailQue>
                <DetailAns>
                  <AnsPoke>{pokemon.name}</AnsPoke>
                  <AnsPoke>{pokemon.wildname}</AnsPoke>
                  <AnsPoke>{pokemon.status}</AnsPoke>
                </DetailAns>
              </DetailWrap>
            </CardSection>
            <CardFooter>
              <FooterRemove>
                <RemoveButton onClick={() => deletePoke(pokemon.id, pokemon.pokemonIndex, ownedpoke)} >Remove</RemoveButton>
              </FooterRemove>
              <FooterRelease>
              {pokemon.status === 'Active' ? (
                  <ReleaseButton onClick ={() => releasePoke(pokemon.id)} >Release</ReleaseButton>
              ) : (null)}
              </FooterRelease>
            </CardFooter>
          </PokeCard>
        ))}
      </AppSection>
    </AppWrapper>
   );
  }
const mapStatetoProps = ({myPokemonList, pokeList}) => {
    return{
      pokeList: myPokemonList.mypoke,
      pokeListById: myPokemonList.mypokeById,
      mypokeList : pokeList.pokeList
    }
}
 
export default connect(mapStatetoProps, {
  fetchMyPokeAction, 
  deleteMyPokemon,
  releaseMyPokemon
}) (MyPokemon);