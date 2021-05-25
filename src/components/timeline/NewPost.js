import styled from 'styled-components';

export default function NewPost () {

    return (
        <Body>
          <Post>
            <Icon>
              <img />
            </Icon>
            <form>
              <p>O que você tem para favoritar hoje?</p>
              <InputLink required type="url" placeholder={"http://..."} />
              <InputDescricao
                required
                type="text"
                placeholder={"Muito irado esse link falando de #javascript"}
              />
              <Button disabled={false}>Publicar</Button>
            </form>
          </Post>
        </Body>
      );
    }
    
    const Post = styled.div`
      background-color: white;
      width: 611px;
      height: 209px;
      border-radius: 16px;
      display: flex;
      padding-right: 22px;
      padding-bottom: 16px;
      form {
        flex-direction: column;
        width: 503px;
        p {
          color: #707070;
          font-size: 20px;
          font-family: Lato;
          weight: 300;
        }
        input {
          width: 100%;
          margin-bottom: 5px;
          margin-top: 0px;
          background-color: #efefef;
          border: none;
          border-radius: 5px;
          padding-left: 12px;
          ::placeholder {
            font-color: #949494;
            font-size: 15px;
          }
        }
      }
    `;
    const Body = styled.div`
      background-color: #333333;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    const Icon = styled.div`
      width: 50px;
      height: 50px;
      background-color: #333333;
      border-radius: 25px;
      margin-top: 16px;
      margin-left: 18px;
      margin-right: 18px;
    `;
    const InputLink = styled.input`
      height: 30px;
    `;
    const InputDescricao = styled.input`
      height: 66px;
      margin-top: 8px;
      ::placeholder {
        position: absolute;
        top: 8px;
      }
    `;
    const Button = styled.button`
      width: 112px;
      height: 31px;
      right: -16px;
      border: none;
      background-color: #1877f2;
      border-radius: 5px;
      color: white;
      font-size: 14px;
      &:disabled {
        background-color: grey;
        color: lightgrey;
      }
    `;
    