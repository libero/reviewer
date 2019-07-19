// This should contain the types and functions to call the graphql resolvers
import { request } from 'graphql-request';

//  TYPES

export interface Submission {
    id: string;
    title: string;
    lastStepVisited: string;
    updated: string;
}

// RESOLVERS

// The following functions are a simple abstraction to separate the concerns of the page/view layer and the controller layer that communicates with the graphql
// This is by no means the final way of doing this, it's merely to start to establish the beginnings of a pattern.

declare var API_HOST: string;

export async function getSubmission(id: string): Promise<Submission | null> {
    const submissionQuery = `
    query GetSubmission($id: ID!) {
      getSubmission(id: $id){
        id, title, updated
      }
    }`;

    const { getSubmission } = await request(API_HOST + '/graphql', submissionQuery, { id });
    return getSubmission;
}

export async function setSubmissionTitle(id: string, title: string): Promise<Submission | null> {
    const submissionQuery = `
    query SetSubmissionTitle($id: ID!, $title: String!) {
      changeSubmissionTitle (id: $id, title: $title){
        id, title, updated
      }
    }`;

    const { changeSubmissionTitle } = await request(API_HOST + '/graphql', submissionQuery, { id, title });
    return changeSubmissionTitle;
}

export async function getSubmissions(): Promise<Submission[]> {
    return [];
}
