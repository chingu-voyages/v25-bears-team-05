import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Network.css";
import backIcon from "../../images/backicon.svg";
import Button from "../../components/button";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { getConnections, removeConnection } from "../../services/user";
import ProfileCard from "../../components/profileCard";
import Pagenator from "../../components/pagenator";
import OptionsMenu from "../../components/optionsMenu";
import { IUserConnection } from "../../services/user/user.type";
import Nav from "../../components/nav";
import { getCurrentUserInfo } from "../../services/user/currentUserInfo";
import TopBar from "../../components/topBar";
import { ISearchResults } from "../../services/search/search.types";
import { doSearch } from "../../services/search/search";
import Search from "../search";

function Network() {
  const match: any = useRouteMatch("/:userId");
  const userId = useRef(match.params.userId.toLowerCase());
  const [isMe, setIsMe] = useState(false);
  const history = useHistory();
  const handleGoBack = () => history.goBack();
  const [connections, setConnections] = useState<IUserConnection[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [isEndPage, setIsEndPage] = useState(false);
  const isLoadingNextPage = useRef(true);
  const handleRemoveConnection = (connectionId: string) => {
    const onSuccess = () => {
      setConnections((connections) =>
        connections.filter(({ id }) => id !== connectionId)
      );
    };
    removeConnection({
      connectionId,
      onSuccess,
      onError: (msg) => setErrorMessage(msg),
    });
  };
  const nextPage = useCallback(() => {
    if (!isLoadingNextPage.current) {
      setPage((page) => page + 1);
      isLoadingNextPage.current = true;
    }
  }, []);

  useEffect(() => {
    (async () => {
      const currentUserInfo = await getCurrentUserInfo();
      setIsMe(userId.current === "me" || currentUserInfo.id === userId.current);
    })();
  }, []);

  useEffect(() => {
    const limitToNResults = 10;
    const onSuccess = (connections: { [keyof: string]: IUserConnection }) => {
      const connectionsArray = Object.entries(
        connections
      ).map(([id, data]) => ({ ...data, id }));
      if (connectionsArray.length < limitToNResults) {
        setIsEndPage(true);
      }
      page === 0
        ? setConnections(connectionsArray)
        : setConnections((currentConnections) => [
          ...currentConnections,
          ...connectionsArray,
        ]);
      isLoadingNextPage.current = false;
    };
    getConnections({
      userId: userId.current,
      limit: limitToNResults,
      offset: limitToNResults * page,
      onSuccess,
      onError: setErrorMessage,
    });
  }, [page]);
  const RemoveOption = ({
    connectionData,
  }: {
    connectionData: IUserConnection;
  }) => (
    <OptionsMenu
      buttons={{
        "Remove connection": {
          action: () => {
            handleRemoveConnection(connectionData.id);
          },
          confirm: true,
        },
      }}
      refTitle={`${connectionData.firstName} ${connectionData.lastName}`}
    />
  );
  const ConnectionItem = ({
    connectionData,
  }: {
    connectionData: IUserConnection;
  }) => (
    <li key={connectionData.id}>
      <Link
        className="connections-list__link"
        to={`/${connectionData.id}/profile`}
      >
        <ProfileCard type="connection" data={{ ...connectionData }} />
      </Link>
      {isMe && <RemoveOption {...{ connectionData }} />}
    </li>
  );
  
  const onSearchSubmit = (queryString: string) => {
    // Placeholder
  }
  return (
    <div className="Network-page">
      <header className="Network-page__top-bar--mobile">
        <Button role="link" onClick={handleGoBack}>
          <img className="Network-page__back-icon" src={backIcon} alt="back" />
        </Button>
        <h1 className="Network-page__title">Connections</h1>
      </header>
      <TopBar className="Network-page__top-bar--desktop" onSearchSubmit={onSearchSubmit} />
     
        <main className="Network-page__main">
          {errorMessage && <p>{errorMessage}</p>}
          <ul className="Network-page__connections-list">
            {connections.map((connectionData: IUserConnection) => (
              <ConnectionItem key={connectionData.id} {...{ connectionData }} />
            ))}
          </ul>
          <Pagenator {...{ page, nextPage, active: !isEndPage }} />
        </main>
      <Nav />
    </div>
  );
}

export default Network;
