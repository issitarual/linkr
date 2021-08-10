import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TrendingList from "../hashtag/TrendingList";

/*import de style components*/
import {
  TimelineContainer,
  Container,
  TimelineContent,
} from "../timelineStyledComponents";

/*import dos Posts*/
import Posts from "../Posts";

/*InfiniteScroller*/
import InfiniteScroll from "react-infinite-scroller";

export default function MyLikes({ goToLink, openMap }) {
  const history = useHistory();
  const [likedPosts, setLikedPosts] = useState([]);
  const [olderLikes, setOlderLikes] = useState([]);
  const { user } = useContext(UserContext);
  const [allPosts, setAllPosts] = useState([]);
  const [serverLoading, setServerLoading] = useState(true);
  const inputRef = useRef([]);

  /*Logics of infinite Scroller*/
  const [maxNumberOfPosts, setMaxNumberOfPosts] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    const getPosts = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/posts/liked`,
      config
    );

    getPosts.then((response) => {
      const newArray = response.data.posts;

      setAllPosts(newArray);
      setServerLoading(false);
      let sharpedHeart = [];
      newArray.forEach((post) => {
        post.likes.forEach((n) => {
          if (n.userId === user.user.id) {
            sharpedHeart.push({
              id: post.id,
              likes: post.likes.length,
              names: post.likes.map((n) => n["user.username"]),
            });
          }
        });
      });
      setLikedPosts(sharpedHeart);
      setOlderLikes(sharpedHeart);
    });

    getPosts.catch((responseError) => {
      alert(`Houve uma falha ao obter os posts. Por favor atualize a página`);
      return;
    });
  }, []);

  function sendToHashtag(val) {
    const newVal = val.replace("#", "");
    history.push(`/hashtag/${newVal}`);
  }

  function goToUserPosts(id) {
    if (id !== user.user.id) {
      history.push(`/user/${id}`);
    } else {
      history.push(`/my-posts`);
    }
  }

  function sendToHashtag(val) {
    const newVal = val.replace("#", "");
    history.push(`/hashtag/${newVal}`);
  }

  function scrollPage(lastPost) {
    if (allPosts[lastPost] === undefined) {
      return;
    }

    const getNewPosts = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/posts/liked?offset=20`,
      config
    );

    getNewPosts.then((response) => {
      if (response.data.posts.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      const scrollPosts = response.data.posts;
      setAllPosts([...allPosts, ...scrollPosts]);
    });

    getNewPosts.catch((responseError) => {
      alert("houve um erro ao atualizar");
    });
  }
  return (
    <Container>
      <TimelineContainer>
        <h1>my likes</h1>

        <TimelineContent>
          <InfiniteScroll
            pageStart={0}
            loadMore={() => scrollPage(allPosts.length - 1)}
            hasMore={hasMore}
            loader={
              <div className="loader" key={0}>
                Loading More Posts...
              </div>
            }
            threshold={1}
            className="Scroller"
          >
            <Posts
              noPostsMessage={"Você ainda não curtiu nenhum post"}
              serverLoading={serverLoading}
              allPosts={allPosts}
              goToUserPosts={goToUserPosts}
              olderLikes={olderLikes}
              likedPosts={likedPosts}
              user={user}
              like={like}
              inputRef={inputRef}
              goToLink={goToLink}
              sendToHashtag={sendToHashtag}
              openMap={openMap}
            />
          </InfiniteScroll>
          <TrendingList send={sendToHashtag} />
        </TimelineContent>
      </TimelineContainer>
    </Container>
  );

  function like(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (likedPosts.map((n) => n.id).includes(id)) {
      const request = axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/posts/${id}/dislike`,
        {},
        config
      );
      request.then((success) => {
        setLikedPosts(likedPosts.filter((n, i) => n.id !== id));
        if (olderLikes.map((n) => n.id).includes(id))
          setOlderLikes([
            ...olderLikes.filter((n, i) => n.id !== id),
            {
              id: id,
              likes: success.data.post.likes.length,
              names: success.data.post.likes.map((n) => n.username),
            },
          ]);
      });
      request.catch((error) => alert("Ocorreu um erro, tente novamente."));
    } else {
      const request = axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/posts/${id}/like`,
        {},
        config
      );
      request.then((success) => {
        setLikedPosts([
          ...likedPosts,
          {
            id: id,
            likes: success.data.post.likes.length,
            names: success.data.post.likes.map((n) => n.username),
          },
        ]);
        if (olderLikes.map((n) => n.id).includes(id)) {
          setOlderLikes([
            ...olderLikes.filter((n, i) => n.id !== id),
            {
              id: id,
              likes: success.data.post.likes.length,
              names: success.data.post.likes.map((n) => n.username),
            },
          ]);
        }
      });
      request.catch((error) => alert("Ocorreu um erro, tente novamente."));
    }
  }
}
