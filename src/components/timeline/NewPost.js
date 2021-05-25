import styled from 'styled-components';

export default function NewPost () {

    function createNewPost () {
        
    }

    return (
        <Body>
          <Post>
            <Icon>
              <img src={''}/>
            </Icon>
            <Form >
              <p>O que você tem para favoritar hoje?</p>
              <InputLink required type="url" placeholder={"http://..."} />
              <InputDescricao
                type="text"
                placeholder={"Muito irado esse link falando de #javascript"}
              />
              <Button disabled={false}>Publicar</Button>
            </Form>
          </Post>
        </Body>
      );
    }
    
    const Body = styled.div`
        background-color: #333333;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Lato;
  `;
  
    const Post = styled.div`
        background-color: white;
        width: 611px;
        height: 209px;
        border-radius: 16px;
        display: flex;
        padding-right: 22px;
        padding-bottom: 16px;
    `;

    const Form = styled.form`
        width: 503px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        p {
            color: #707070;
            font-size: 20px;
            weight: 300;
            margin-top: 21px;
            margin-bottom: 16px;
            width: 100%;
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
                color: #949494;
                font-size: 15px;
            }
        }
    `;
  
    const Icon = styled.div`
        width: 50px;
        height: 50px;
        background-color: #333333;
        border-radius: 30px;
        margin-top: 16px;
        margin-left: 18px;
        margin-right: 18px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 30px;
        }
    `;

    const InputLink = styled.input`
        height: 30px;
    `;

    const InputDescricao = styled.input`
        height: 66px;
        margin-top: 8px;
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
    
