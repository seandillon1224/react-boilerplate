import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import OtherLoader from "./Components/OtherLoader/OtherLoader";
import styled from "styled-components";
import SideNav from "./Components/SideNav/SideNav";
import Header from "./Components/Header/Header";
import { Context } from "./App";
import STIP_USER from "./graphql/queries/StipUser";

const StyledApp = styled.div`
  margin: 15px;
  margin-left: ${(props) => (props.show ? "115px" : "15px")};
  transition: margin-left 0.5s;
  padding-top: 64px;
`;

const Wrapper = ({ component, accountInfo, ...props }) => {
  const { show } = useContext(Context);
  const Component = component;
  const { loading, error, data } = useQuery(STIP_USER, {
    variables: { email: accountInfo.account.userName.toLowerCase() },
  });
  if (loading) return <OtherLoader />;
  if (error) return <div>An Error Occurred Please Try Again Later!</div>;

  return (
    <>
      <Header accountInfo={accountInfo} />
      <SideNav />
      <StyledApp show={show}>
        {!data.stipUserByEmail || data.stipUserByEmail.role !== "ADMIN" ? (
          <h1
            style={{
              fontFamily: "Roboto, sans-serif",
              textAlign: "center",
              width: "100%",
            }}
          >
            You are not authorized to access this page. Please contact your
            manager if you think this is an error or this persists.
          </h1>
        ) : (
          <Component
            roles={data.stipUserByEmail}
            {...props}
            accountInfo={accountInfo}
          />
        )}
      </StyledApp>
    </>
  );
};

export default Wrapper;
