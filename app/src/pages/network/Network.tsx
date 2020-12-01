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

function Network() {
  const match: any = useRouteMatch("/:userId");
  const userId = useRef(match.params.userId.toLowerCase());
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
    const limitToNResults = 10;
    const onSuccess = (connections: { [keyof: string]: IUserConnection }) => {
      const connectionsArray = Object.entries(
        connections
      ).map(([id, data]) => ({ ...data, id }));
      if (connectionsArray.length < limitToNResults) {
        setIsEndPage(true);
      }
      console.log(connectionsArray);
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
  return (
    <div className="Network-page">
      <header className="Network-page__top-bar">
        <Button role="link" onClick={handleGoBack}>
          <img className="Network-page__back-icon" src={backIcon} alt="back" />
        </Button>
        <h1 className="Network-page__title">Connections</h1>
      </header>
      <main>
        {errorMessage && <p>{errorMessage}</p>}
        <ul className="Network-page__connections-list">
          {connections.map((connectionData: IUserConnection) => (
            <li key={connectionData.id}>
              <Link
                className="connections-list__link"
                to={`/${connectionData.id}/profile`}
              >
                <ProfileCard connectionInfo={{ ...connectionData }} />
              </Link>
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
            </li>
          ))}
        </ul>
        <Pagenator
          {...{ page, nextPage, active: isEndPage || connections.length > 0 }}
        />
      </main>
    </div>
  );
}

export default Network;
