import { NextResponse } from "next/server";

/* ================= TYPES ================= */

export type Meta = {
  page?: number;
  limit?: number;
  total?: number | null;
};

export type ApiSuccess<T> = {
  data: T;
  meta?: Meta;
};

export type ApiError = {
  message: string;
};


type SuccessOptions = {
  status?: number;
  meta?: Meta;
};

export function success<T>(
  data: T,
  options?: SuccessOptions
) {
  return NextResponse.json<ApiSuccess<T>>(
    {
      data,
      ...(options?.meta && { meta: options.meta }),
    },
    {
      status: options?.status ?? 200,
    }
  );
}

export function failure(message: string, status = 400) {
  return NextResponse.json<ApiError>({ message }, { status });
}



export function successWithCookies<T>(
  data: T,
  cookies: (res: NextResponse) => void,
  options?: SuccessOptions
) {
  const res = NextResponse.json<ApiSuccess<T>>(
    {
      data,
      ...(options?.meta && { meta: options.meta }),
    },
    {
      status: options?.status ?? 200,
    }
  );

  cookies(res);
  return res;
}
