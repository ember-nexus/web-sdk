import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

const relatedHandler: RestHandler[] = [
  rest.get(`http://localhost/${ElementUuid.ElementWithRelatedElements}/related`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        type: '_PartialCollection',
        id: `/${ElementUuid.ElementWithRelatedElements}/related?page=1&pageSize=25`,
        totalNodes: 4,
        links: {
          first: `/${ElementUuid.ElementWithRelatedElements}/related?page=1&pageSize=25`,
          previous: null,
          next: null,
          last: `/${ElementUuid.ElementWithRelatedElements}/related?page=1&pageSize=25`,
        },
        nodes: [
          {
            type: 'Node',
            id: '81771a82-b82b-407a-a7a6-ceec5835f260',
            data: {
              some: 'data',
            },
          },
          {
            type: 'Node',
            id: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
            data: {
              some: 'data',
            },
          },
          {
            type: 'Node',
            id: '3138a423-0e4e-4c25-a707-4b1ec3a154f4',
            data: {
              some: 'data',
            },
          },
          {
            type: 'Node',
            id: 'c60b8b6b-d0dc-467f-b5f0-9458f115ba1e',
            data: {
              some: 'data',
            },
          },
        ],
        relations: [
          {
            type: 'OWNS',
            id: '58f87378-bf72-40c4-a89f-d3d86c29a241',
            start: ElementUuid.ElementWithRelatedElements,
            end: '81771a82-b82b-407a-a7a6-ceec5835f260',
            data: {},
          },
          {
            type: 'OWNS',
            id: '40ce6aec-0dad-4ebf-8963-db1512c02274',
            start: ElementUuid.ElementWithRelatedElements,
            end: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
            data: {},
          },
          {
            type: 'OWNS',
            id: 'd1021ce6-ae51-48a1-a96b-25d93a1c3d8d',
            start: '3138a423-0e4e-4c25-a707-4b1ec3a154f4',
            end: ElementUuid.ElementWithRelatedElements,
            data: {},
          },
          {
            type: 'TAGGED',
            id: '1cd96b0a-9a0e-4c4c-b946-dc9ca81dfae3',
            start: 'c60b8b6b-d0dc-467f-b5f0-9458f115ba1e',
            end: ElementUuid.ElementWithRelatedElements,
            data: {},
          },
        ],
      }),
    );
  }),
  rest.get(`http://localhost/${ElementUuid.AuthenticatedDataNode}/related`, (_req, res, ctx) => {
    if (!_req.headers.has('authorization')) {
      return res(
        ctx.status(403),
        ctx.set({
          'content-type': 'application/problem+json',
        }),
        ctx.body(
          JSON.stringify({
            type: '403-forbidden',
            title: 'Forbidden',
            status: 403,
            detail: 'Client does not have permissions to perform action.',
          }),
        ),
      );
    }
    if (_req.headers.get('authorization') !== 'secret-token:gRDDumwGJbb') {
      return res(
        ctx.status(403),
        ctx.set({
          'content-type': 'application/problem+json',
        }),
        ctx.body(
          JSON.stringify({
            type: '403-forbidden',
            title: 'Forbidden',
            status: 403,
            detail: 'Client does not have permissions to perform action.',
          }),
        ),
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        type: '_PartialCollection',
        id: `/${ElementUuid.AuthenticatedDataNode}/related?page=1&pageSize=25`,
        totalNodes: 4,
        links: {
          first: `/${ElementUuid.AuthenticatedDataNode}/related?page=1&pageSize=25`,
          previous: null,
          next: null,
          last: `/${ElementUuid.AuthenticatedDataNode}/related?page=1&pageSize=25`,
        },
        nodes: [
          {
            type: 'Node',
            id: '81771a82-b82b-407a-a7a6-ceec5835f260',
            data: {
              some: 'data',
            },
          },
          {
            type: 'Node',
            id: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
            data: {
              some: 'data',
            },
          },
          {
            type: 'Node',
            id: '3138a423-0e4e-4c25-a707-4b1ec3a154f4',
            data: {
              some: 'data',
            },
          },
          {
            type: 'Node',
            id: 'c60b8b6b-d0dc-467f-b5f0-9458f115ba1e',
            data: {
              some: 'data',
            },
          },
        ],
        relations: [
          {
            type: 'OWNS',
            id: '58f87378-bf72-40c4-a89f-d3d86c29a241',
            start: ElementUuid.AuthenticatedDataNode,
            end: '81771a82-b82b-407a-a7a6-ceec5835f260',
            data: {},
          },
          {
            type: 'OWNS',
            id: '40ce6aec-0dad-4ebf-8963-db1512c02274',
            start: ElementUuid.AuthenticatedDataNode,
            end: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
            data: {},
          },
          {
            type: 'OWNS',
            id: 'd1021ce6-ae51-48a1-a96b-25d93a1c3d8d',
            start: '3138a423-0e4e-4c25-a707-4b1ec3a154f4',
            end: ElementUuid.AuthenticatedDataNode,
            data: {},
          },
          {
            type: 'TAGGED',
            id: '1cd96b0a-9a0e-4c4c-b946-dc9ca81dfae3',
            start: 'c60b8b6b-d0dc-467f-b5f0-9458f115ba1e',
            end: ElementUuid.AuthenticatedDataNode,
            data: {},
          },
        ],
      }),
    );
  }),
];
export default relatedHandler;
