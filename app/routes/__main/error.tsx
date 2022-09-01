import React from 'react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useCatch, useLoaderData, useParams } from '@remix-run/react';

type LoaderData = {
  user?: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  console.log('params-->', params);
  let user = 'hello word';

  const a = Math.random() * (10 - 1) + 1 | 0;
  console.log(Math.random() * (10 - 1) + 1 | 0);

  if (a <= 5) {
    // When there's an expected error (like no found user) throw a response.
    throw new Response("Not Found", { status: 500 });
  }

  return json<LoaderData>({ user });
};


export default () => {
  const { user } = useLoaderData<LoaderData>();

  const handleError = () => {
    console.log('dianji');
    throw new Error('自定义错误!')
  }

  return (
    <div>
      <h1>{user}</h1>
      自定义错误页

      <button onClick={handleError}>点报错</button>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  switch (caught.status) {
    case 404: {
      return <h2>User with ID "{params.userId}" not found!</h2>;
    }
    // default: {
    //   // if we don't handle this then all bets are off. Just throw an error
    //   // and let the nearest ErrorBoundary handle this
    //   throw new Error(`${caught.status} not handled`);
    // }
  }
}

// this will handle unexpected errors (like the default case above where the
// CatchBoundary gets a response it's not prepared to handle).
export function ErrorBoundary({ error }: { error: Error }) {
  console.error('ErrorBoundary---',error);

  return (
    <div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}
