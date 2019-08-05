// This should contain the types and functions to call the graphql resolvers
import { request } from 'graphql-request';
import { Submission } from '../types';

// RESOLVERS

// The following functions are a simple abstraction to separate the concerns of the page/view layer and the controller layer that communicates with the graphql
// This is by no means the final way of doing this, it's merely to start to establish the beginnings of a pattern.

declare var API_HOST: string;

export async function getSubmission(id: string): Promise<Submission | null> {
    const query = `
    query GetSubmission($id: ID!) {
      getSubmission(id: $id){
        id, title, updated
      }
    }`;

    const { getSubmission } = await request(API_HOST + '/graphql', query, { id });
    return getSubmission;
}

export async function startSubmission(): Promise<Submission | null> {
    const mutation = `
    mutation StartSubmission {
      startSubmission {
        id,
        title,
        updated
      }
    }`;

    const { startSubmission } = await request(API_HOST + '/graphql', mutation);
    return startSubmission;
}

export async function deleteSubmission(id: string): Promise<boolean> {
    const mutation = `
        mutation DeleteSubmission($id: ID!) {
            removeSubmission(id: $id) {
                id
            }
        }    
    `;

    const { removeSubmission } = await request(API_HOST + '/graphql', mutation, { id });
    return removeSubmission;
}

export async function setSubmissionTitle(id: string, title: string): Promise<Submission | null> {
    const mutation = `
    mutation SetSubmissionTitle($id: ID!, $title: String!) {
      changeSubmissionTitle (id: $id, title: $title){
        id, title, updated
      }
    }`;

    const { changeSubmissionTitle } = await request(API_HOST + '/graphql', mutation, { id, title });
    return changeSubmissionTitle;
}

export async function getSubmissions(): Promise<Submission[]> {
    const query = `
    query GetSubmissions {
      getSubmissions {
        id, title, updated
      }
    }`;

    const { getSubmissions } = await request(API_HOST + '/graphql', query);
    return getSubmissions;
}
