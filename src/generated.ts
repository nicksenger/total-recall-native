import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
};

export type DeckFilter = {
  and?: Maybe<Array<DeckFilter>>;
  or?: Maybe<Array<DeckFilter>>;
  not?: Maybe<DeckFilter>;
  id?: Maybe<Filter_Int_>;
  name?: Maybe<Filter_String_>;
  owner?: Maybe<UserFilter>;
  language?: Maybe<LanguageFilter>;
};

export type Filter_ScoreValue_ = {
  eq?: Maybe<ScoreValue>;
  not_eq?: Maybe<ScoreValue>;
  eq_any?: Maybe<Array<ScoreValue>>;
};

export enum DeckColumns {
  Id = 'id',
  Name = 'name',
  Owner = 'owner',
  Language = 'language'
}

export type LanguagesPrimaryKey = {
  id: Scalars['Int'];
};

export type SetCardFilter = {
  and?: Maybe<Array<SetCardFilter>>;
  or?: Maybe<Array<SetCardFilter>>;
  not?: Maybe<SetCardFilter>;
  id?: Maybe<Filter_Int_>;
  card_id?: Maybe<CardFilter>;
  set_id?: Maybe<SetFilter>;
};

export type DecksPrimaryKey = {
  id: Scalars['Int'];
};

export type Language = {
   __typename?: 'Language';
  id: Scalars['Int'];
  name: Scalars['String'];
  abbreviation: Scalars['String'];
};

export type UserDeleteset = {
  id: Scalars['Int'];
};

export type UsersPrimaryKey = {
  id: Scalars['Int'];
};

export type SetOrderBy = {
  column: SetColumns;
  direction?: Maybe<Order>;
};

export enum BackColumns {
  Id = 'id',
  Text = 'text',
  Language = 'language',
  Audio = 'audio',
  Image = 'image'
}

export type CardDeleteset = {
  id: Scalars['Int'];
};

export type Deck = {
   __typename?: 'Deck';
  id: Scalars['Int'];
  name: Scalars['String'];
  owner: User;
  language: Language;
};

export type SetCardOrderBy = {
  column: SetCardColumns;
  direction?: Maybe<Order>;
};

export type NewSet = {
  name: Scalars['String'];
  deck: Scalars['Int'];
  cards: Array<Scalars['Int']>;
};

export type BackFilter = {
  and?: Maybe<Array<BackFilter>>;
  or?: Maybe<Array<BackFilter>>;
  not?: Maybe<BackFilter>;
  id?: Maybe<Filter_Int_>;
  text?: Maybe<Filter_String_>;
  language?: Maybe<LanguageFilter>;
  audio?: Maybe<Filter_Nullable_String__>;
  image?: Maybe<Filter_Nullable_String__>;
};

export type CardsPrimaryKey = {
  id: Scalars['Int'];
};

export type CardChangeset = {
  id: Scalars['Int'];
  link?: Maybe<Scalars['String']>;
};

export type NewCard = {
  front: Scalars['String'];
  back: Scalars['String'];
  deck: Scalars['Int'];
  link?: Maybe<Scalars['String']>;
};

export type SetChangeset = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Set_CardsPrimaryKey = {
  id: Scalars['Int'];
};

export type ScoreFilter = {
  and?: Maybe<Array<ScoreFilter>>;
  or?: Maybe<Array<ScoreFilter>>;
  not?: Maybe<ScoreFilter>;
  id?: Maybe<Filter_Int_>;
  created_at?: Maybe<Filter_BigInt_>;
  card?: Maybe<CardFilter>;
  value?: Maybe<Filter_ScoreValue_>;
};

export type CardFilter = {
  and?: Maybe<Array<CardFilter>>;
  or?: Maybe<Array<CardFilter>>;
  not?: Maybe<CardFilter>;
  id?: Maybe<Filter_Int_>;
  created_at?: Maybe<Filter_BigInt_>;
  front?: Maybe<Filter_String_>;
  back?: Maybe<BackFilter>;
  deck?: Maybe<DeckFilter>;
  link?: Maybe<Filter_Nullable_String__>;
  sets?: Maybe<SetCardFilter>;
  scores?: Maybe<ScoreFilter>;
};

export type ScoreChangeset = {
  id: Scalars['Int'];
  value: ScoreValue;
};

export type LanguageFilter = {
  and?: Maybe<Array<LanguageFilter>>;
  or?: Maybe<Array<LanguageFilter>>;
  not?: Maybe<LanguageFilter>;
  id?: Maybe<Filter_Int_>;
  name?: Maybe<Filter_String_>;
  abbreviation?: Maybe<Filter_String_>;
};

export type SetsPrimaryKey = {
  id: Scalars['Int'];
};

export type NewUser = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ScoresPrimaryKey = {
  id: Scalars['Int'];
};

export type Filter_BigInt_ = {
  eq?: Maybe<Scalars['BigInt']>;
  not_eq?: Maybe<Scalars['BigInt']>;
  eq_any?: Maybe<Array<Scalars['BigInt']>>;
};

export type Set = {
   __typename?: 'Set';
  id: Scalars['Int'];
  created_at: Scalars['BigInt'];
  name: Scalars['String'];
  deck: Deck;
  owner: User;
  cards: Array<SetCard>;
};


export type SetCardsArgs = {
  filter?: Maybe<SetCardFilter>;
};

export type Filter_Int_ = {
  eq?: Maybe<Scalars['Int']>;
  not_eq?: Maybe<Scalars['Int']>;
  eq_any?: Maybe<Array<Scalars['Int']>>;
};

export type SetFilter = {
  and?: Maybe<Array<SetFilter>>;
  or?: Maybe<Array<SetFilter>>;
  not?: Maybe<SetFilter>;
  id?: Maybe<Filter_Int_>;
  created_at?: Maybe<Filter_BigInt_>;
  name?: Maybe<Filter_String_>;
  deck?: Maybe<DeckFilter>;
  owner?: Maybe<UserFilter>;
  cards?: Maybe<SetCardFilter>;
};

export type CardOrderBy = {
  column: CardColumns;
  direction?: Maybe<Order>;
};

export type DeckChangeset = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Filter_String_ = {
  eq?: Maybe<Scalars['String']>;
  not_eq?: Maybe<Scalars['String']>;
  eq_any?: Maybe<Array<Scalars['String']>>;
  like?: Maybe<Scalars['String']>;
};

export type Card = {
   __typename?: 'Card';
  id: Scalars['Int'];
  created_at: Scalars['BigInt'];
  front: Scalars['String'];
  back: Back;
  deck: Deck;
  link?: Maybe<Scalars['String']>;
  sets: Array<SetCard>;
  scores: Array<Score>;
};


export type CardSetsArgs = {
  filter?: Maybe<SetCardFilter>;
};


export type CardScoresArgs = {
  filter?: Maybe<ScoreFilter>;
};

export type NewDeck = {
  name: Scalars['String'];
  language: Scalars['Int'];
};

export type Back = {
   __typename?: 'Back';
  id: Scalars['Int'];
  text: Scalars['String'];
  language: Language;
  audio?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type UserFilter = {
  and?: Maybe<Array<UserFilter>>;
  or?: Maybe<Array<UserFilter>>;
  not?: Maybe<UserFilter>;
  id?: Maybe<Filter_Int_>;
  username?: Maybe<Filter_String_>;
  created_at?: Maybe<Filter_BigInt_>;
  updated_at?: Maybe<Filter_BigInt_>;
};

export enum SetCardColumns {
  Id = 'id',
  CardId = 'card_id',
  SetId = 'set_id'
}

export type Mutation = {
   __typename?: 'Mutation';
  CreateUser?: Maybe<User>;
  CreateUsers: Array<User>;
  CreateDeck?: Maybe<Deck>;
  CreateDecks: Array<Deck>;
  CreateCard?: Maybe<Card>;
  CreateCards: Array<Card>;
  CreateScore?: Maybe<Score>;
  CreateScores: Array<Score>;
  CreateSet?: Maybe<Set>;
  CreateSets: Array<Set>;
  UpdateUser?: Maybe<User>;
  UpdateDeck?: Maybe<Deck>;
  UpdateCard?: Maybe<Card>;
  UpdateScore?: Maybe<Score>;
  UpdateSet?: Maybe<Set>;
  DeleteUser?: Maybe<DeletedCount>;
  DeleteDeck?: Maybe<DeletedCount>;
  DeleteCard?: Maybe<DeletedCount>;
  DeleteSet?: Maybe<DeletedCount>;
};


export type MutationCreateUserArgs = {
  NewUser: NewUser;
};


export type MutationCreateUsersArgs = {
  NewUsers: Array<NewUser>;
};


export type MutationCreateDeckArgs = {
  NewDeck: NewDeck;
};


export type MutationCreateDecksArgs = {
  NewDecks: Array<NewDeck>;
};


export type MutationCreateCardArgs = {
  NewCard: NewCard;
};


export type MutationCreateCardsArgs = {
  NewCards: Array<NewCard>;
};


export type MutationCreateScoreArgs = {
  NewScore: NewScore;
};


export type MutationCreateScoresArgs = {
  NewScores: Array<NewScore>;
};


export type MutationCreateSetArgs = {
  NewSet: NewSet;
};


export type MutationCreateSetsArgs = {
  NewSets: Array<NewSet>;
};


export type MutationUpdateUserArgs = {
  UpdateUser: UserChangeset;
};


export type MutationUpdateDeckArgs = {
  UpdateDeck: DeckChangeset;
};


export type MutationUpdateCardArgs = {
  UpdateCard: CardChangeset;
};


export type MutationUpdateScoreArgs = {
  UpdateScore: ScoreChangeset;
};


export type MutationUpdateSetArgs = {
  UpdateSet: SetChangeset;
};


export type MutationDeleteUserArgs = {
  DeleteUser: UserDeleteset;
};


export type MutationDeleteDeckArgs = {
  DeleteDeck: DeckDeleteset;
};


export type MutationDeleteCardArgs = {
  DeleteCard: CardDeleteset;
};


export type MutationDeleteSetArgs = {
  DeleteSet: SetDeleteset;
};

export type Query = {
   __typename?: 'Query';
  Users: Array<User>;
  User?: Maybe<User>;
  Languages: Array<Language>;
  Language?: Maybe<Language>;
  Decks: Array<Deck>;
  Deck?: Maybe<Deck>;
  Cards: Array<Card>;
  Card?: Maybe<Card>;
  Scores: Array<Score>;
  Score?: Maybe<Score>;
  Backs: Array<Back>;
  Back?: Maybe<Back>;
  Sets: Array<Set>;
  Set?: Maybe<Set>;
  SetCards: Array<SetCard>;
  SetCard?: Maybe<SetCard>;
};


export type QueryUsersArgs = {
  filter?: Maybe<UserFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<UserOrderBy>>;
};


export type QueryUserArgs = {
  primaryKey: UsersPrimaryKey;
};


export type QueryLanguagesArgs = {
  filter?: Maybe<LanguageFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<LanguageOrderBy>>;
};


export type QueryLanguageArgs = {
  primaryKey: LanguagesPrimaryKey;
};


export type QueryDecksArgs = {
  filter?: Maybe<DeckFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<DeckOrderBy>>;
};


export type QueryDeckArgs = {
  primaryKey: DecksPrimaryKey;
};


export type QueryCardsArgs = {
  filter?: Maybe<CardFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<CardOrderBy>>;
};


export type QueryCardArgs = {
  primaryKey: CardsPrimaryKey;
};


export type QueryScoresArgs = {
  filter?: Maybe<ScoreFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<ScoreOrderBy>>;
};


export type QueryScoreArgs = {
  primaryKey: ScoresPrimaryKey;
};


export type QueryBacksArgs = {
  filter?: Maybe<BackFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<BackOrderBy>>;
};


export type QueryBackArgs = {
  primaryKey: BacksPrimaryKey;
};


export type QuerySetsArgs = {
  filter?: Maybe<SetFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<SetOrderBy>>;
};


export type QuerySetArgs = {
  primaryKey: SetsPrimaryKey;
};


export type QuerySetCardsArgs = {
  filter?: Maybe<SetCardFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<SetCardOrderBy>>;
};


export type QuerySetCardArgs = {
  primaryKey: Set_CardsPrimaryKey;
};

export type NewScore = {
  card: Scalars['Int'];
  value: ScoreValue;
};

export type DeckOrderBy = {
  column: DeckColumns;
  direction?: Maybe<Order>;
};

export type Filter_Nullable_String__ = {
  eq?: Maybe<Scalars['String']>;
  not_eq?: Maybe<Scalars['String']>;
  eq_any?: Maybe<Array<Maybe<Scalars['String']>>>;
  is_null?: Maybe<Scalars['Boolean']>;
  like?: Maybe<Scalars['String']>;
};

export type UserChangeset = {
  id: Scalars['Int'];
  password: Scalars['String'];
};

export type LanguageOrderBy = {
  column: LanguageColumns;
  direction?: Maybe<Order>;
};

export type SetDeleteset = {
  id: Scalars['Int'];
};

export type Score = {
   __typename?: 'Score';
  id: Scalars['Int'];
  created_at: Scalars['BigInt'];
  card: Card;
  value: ScoreValue;
};

export enum ScoreValue {
  Zero = 'ZERO',
  One = 'ONE',
  Two = 'TWO',
  Three = 'THREE',
  Four = 'FOUR',
  Five = 'FIVE'
}

export enum CardColumns {
  Id = 'id',
  CreatedAt = 'created_at',
  Front = 'front',
  Back = 'back',
  Deck = 'deck',
  Link = 'link'
}

export enum UserColumns {
  Id = 'id',
  Username = 'username',
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at'
}

export enum SetColumns {
  Id = 'id',
  CreatedAt = 'created_at',
  Name = 'name',
  Deck = 'deck',
  Owner = 'owner'
}

export type UserOrderBy = {
  column: UserColumns;
  direction?: Maybe<Order>;
};

export enum ScoreColumns {
  Id = 'id',
  CreatedAt = 'created_at',
  Card = 'card',
  Value = 'value'
}

export enum LanguageColumns {
  Id = 'id',
  Name = 'name',
  Abbreviation = 'abbreviation'
}

export type DeckDeleteset = {
  id: Scalars['Int'];
};


export type BackOrderBy = {
  column: BackColumns;
  direction?: Maybe<Order>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  created_at: Scalars['BigInt'];
  updated_at: Scalars['BigInt'];
};

/** Defines how to order the result of an query */
export enum Order {
  /** Order elements in ascending order */
  Asc = 'ASC',
  /** Order elements in descending order */
  Desc = 'DESC'
}

export type ScoreOrderBy = {
  column: ScoreColumns;
  direction?: Maybe<Order>;
};

/** A struct representing the number of deleted entities */
export type DeletedCount = {
   __typename?: 'DeletedCount';
  /** Number of deleted entities */
  count: Scalars['BigInt'];
};

export type SetCard = {
   __typename?: 'SetCard';
  id: Scalars['Int'];
  card_id: Card;
  set_id: Set;
};

export type BacksPrimaryKey = {
  id: Scalars['Int'];
};

export type RegisterMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { CreateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type DeckCardsQueryVariables = {
  deckId: Scalars['Int'];
};


export type DeckCardsQuery = (
  { __typename?: 'Query' }
  & { Cards: Array<(
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'created_at' | 'front' | 'link'>
    & { back: (
      { __typename?: 'Back' }
      & Pick<Back, 'text' | 'audio' | 'image'>
    ), scores: Array<(
      { __typename?: 'Score' }
      & Pick<Score, 'value' | 'created_at'>
    )> }
  )> }
);

export type CreateCardMutationVariables = {
  deckId: Scalars['Int'];
  front: Scalars['String'];
  back: Scalars['String'];
  link?: Maybe<Scalars['String']>;
};


export type CreateCardMutation = (
  { __typename?: 'Mutation' }
  & { CreateCard?: Maybe<(
    { __typename?: 'Card' }
    & Pick<Card, 'id'>
  )> }
);

export type DeleteCardMutationVariables = {
  cardId: Scalars['Int'];
};


export type DeleteCardMutation = (
  { __typename?: 'Mutation' }
  & { DeleteCard?: Maybe<(
    { __typename?: 'DeletedCount' }
    & Pick<DeletedCount, 'count'>
  )> }
);

export type EditCardLinkMutationVariables = {
  cardId: Scalars['Int'];
  link: Scalars['String'];
};


export type EditCardLinkMutation = (
  { __typename?: 'Mutation' }
  & { UpdateCard?: Maybe<(
    { __typename?: 'Card' }
    & Pick<Card, 'id'>
  )> }
);

export type LanguageListQueryVariables = {};


export type LanguageListQuery = (
  { __typename?: 'Query' }
  & { Languages: Array<(
    { __typename?: 'Language' }
    & Pick<Language, 'id' | 'abbreviation' | 'name'>
  )> }
);

export type UserDecksQueryVariables = {
  username: Scalars['String'];
};


export type UserDecksQuery = (
  { __typename?: 'Query' }
  & { Decks: Array<(
    { __typename?: 'Deck' }
    & Pick<Deck, 'id' | 'name'>
    & { language: (
      { __typename?: 'Language' }
      & Pick<Language, 'name'>
    ) }
  )> }
);

export type CreateDeckMutationVariables = {
  name: Scalars['String'];
  language: Scalars['Int'];
};


export type CreateDeckMutation = (
  { __typename?: 'Mutation' }
  & { CreateDeck?: Maybe<(
    { __typename?: 'Deck' }
    & Pick<Deck, 'id' | 'name'>
    & { language: (
      { __typename?: 'Language' }
      & Pick<Language, 'name'>
    ) }
  )> }
);

export type DeleteDeckMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteDeckMutation = (
  { __typename?: 'Mutation' }
  & { DeleteDeck?: Maybe<(
    { __typename?: 'DeletedCount' }
    & Pick<DeletedCount, 'count'>
  )> }
);

export type RateCardMutationVariables = {
  cardId: Scalars['Int'];
  rating: ScoreValue;
};


export type RateCardMutation = (
  { __typename?: 'Mutation' }
  & { CreateScore?: Maybe<(
    { __typename?: 'Score' }
    & Pick<Score, 'id'>
  )> }
);

export type UserSetsQueryVariables = {
  deckId: Scalars['Int'];
};


export type UserSetsQuery = (
  { __typename?: 'Query' }
  & { Sets: Array<(
    { __typename?: 'Set' }
    & Pick<Set, 'id' | 'name'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), cards: Array<(
      { __typename?: 'SetCard' }
      & Pick<SetCard, 'id'>
    )> }
  )> }
);

export type CreateSetMutationVariables = {
  deckId: Scalars['Int'];
  name: Scalars['String'];
  card_ids: Array<Scalars['Int']>;
};


export type CreateSetMutation = (
  { __typename?: 'Mutation' }
  & { CreateSet?: Maybe<(
    { __typename?: 'Set' }
    & Pick<Set, 'id'>
  )> }
);

export type DeleteSetMutationVariables = {
  setId: Scalars['Int'];
};


export type DeleteSetMutation = (
  { __typename?: 'Mutation' }
  & { DeleteSet?: Maybe<(
    { __typename?: 'DeletedCount' }
    & Pick<DeletedCount, 'count'>
  )> }
);


export const Register = gql`
    mutation Register($username: String!, $password: String!) {
  CreateUser(NewUser: {username: $username, password: $password}) {
    id
  }
}
    `;
export const DeckCards = gql`
    query DeckCards($deckId: Int!) {
  Cards(filter: {deck: {id: {eq: $deckId}}}) {
    id
    created_at
    front
    back {
      text
      audio
      image
    }
    scores {
      value
      created_at
    }
    link
  }
}
    `;
export const CreateCard = gql`
    mutation CreateCard($deckId: Int!, $front: String!, $back: String!, $link: String) {
  CreateCard(NewCard: {deck: $deckId, front: $front, back: $back, link: $link}) {
    id
  }
}
    `;
export const DeleteCard = gql`
    mutation DeleteCard($cardId: Int!) {
  DeleteCard(DeleteCard: {id: $cardId}) {
    count
  }
}
    `;
export const EditCardLink = gql`
    mutation EditCardLink($cardId: Int!, $link: String!) {
  UpdateCard(UpdateCard: {id: $cardId, link: $link}) {
    id
  }
}
    `;
export const LanguageList = gql`
    query LanguageList {
  Languages {
    id
    abbreviation
    name
  }
}
    `;
export const UserDecks = gql`
    query UserDecks($username: String!) {
  Decks(filter: {owner: {username: {eq: $username}}}) {
    id
    name
    language {
      name
    }
  }
}
    `;
export const CreateDeck = gql`
    mutation CreateDeck($name: String!, $language: Int!) {
  CreateDeck(NewDeck: {name: $name, language: $language}) {
    id
    name
    language {
      name
    }
  }
}
    `;
export const DeleteDeck = gql`
    mutation DeleteDeck($id: Int!) {
  DeleteDeck(DeleteDeck: {id: $id}) {
    count
  }
}
    `;
export const RateCard = gql`
    mutation RateCard($cardId: Int!, $rating: ScoreValue!) {
  CreateScore(NewScore: {card: $cardId, value: $rating}) {
    id
  }
}
    `;
export const UserSets = gql`
    query UserSets($deckId: Int!) {
  Sets(filter: {deck: {id: {eq: $deckId}}}) {
    id
    name
    owner {
      username
    }
    cards {
      id
    }
  }
}
    `;
export const CreateSet = gql`
    mutation CreateSet($deckId: Int!, $name: String!, $card_ids: [Int!]!) {
  CreateSet(NewSet: {deck: $deckId, name: $name, cards: $card_ids}) {
    id
  }
}
    `;
export const DeleteSet = gql`
    mutation DeleteSet($setId: Int!) {
  DeleteSet(DeleteSet: {id: $setId}) {
    count
  }
}
    `;