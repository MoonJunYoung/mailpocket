import styled from 'styled-components'

const SymbolContainer = styled.div`
  margin-top: 100px;
`

const SymbolImg = styled.img`
  width: 120px;
  animation: bounceAnimation 900ms;
  @keyframes bounceAnimation {
  0%, 50%, 80%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  40% {
    transform: translateY(-50px) rotate(30deg);
  }
  60% {
    transform: translateY(-15px) rotate(-15deg);
  }

}
  @media (max-width: 760px) {
    width: 100px;
    }
  
`

const Symbol = () => {
  return (
    <SymbolContainer>
      <SymbolImg src='/images/MailpocketSymbol.png' alt='symbol' />
    </SymbolContainer>
  )
}

export default Symbol