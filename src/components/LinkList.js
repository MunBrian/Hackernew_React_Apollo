import React from "react";
import Link from "./Link";
import { useQuery, gql } from "@apollo/client";
import { subscribe } from "graphql";

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const LinkList = () => {
  const { data, loading, error, subscribeToMore } = useQuery(FEED_QUERY);

  //subscribeToMore acts on new data that comes in over a subscription
  //takes in an object
  // document: that defines the subscription - 'NEW_LINKS_SUBSCRIPTION'
  //updateQuery: update cache
  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
  });

  //   const linksToRender = [
  //     {
  //       id: "link-id-1",
  //       description: "Prisma gives you a powerful database toolkit 😎",
  //       url: "https://prisma.io",
  //     },
  //     {
  //       id: "link-id-2",
  //       description: "The best GraphQL client",
  //       url: "https://www.apollographql.com/docs/react/",
  //     },
  //   ];
  return (
    <div>
      {/* {linksToRender.map((link) => (
        <Link key={link.id} link={link} />
      ))} */}
      {data && (
        <>
          {data.feed.links.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;
