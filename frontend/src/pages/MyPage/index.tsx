import Nav from '../../components/Nav'
import styled from 'styled-components'
import Symbol from '../../components/Symbol'

const MypageContainer = styled.div`
`

const ChannelAddButton = styled.button``


const index = () => {
  const handleChannelAdd = () => {
    window.location.href = "https://slack.com/oauth/v2/authorize?client_id=6427346365504.6466397212374&scope=incoming-webhook,team:read&user_scope="
  }

  return (
    <div>
      <Nav />
      <Symbol />
      <MypageContainer>
        <ChannelAddButton onClick={handleChannelAdd}>채널 추가하기</ChannelAddButton>
      </MypageContainer>

    </div>
  )
}

export default index