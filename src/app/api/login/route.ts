import { NextResponse } from "next/server";

type LoginResponse = {
  token?: string;
  message?: string;
};

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginBody = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email e senha são obrigatórios.' }, { status: 400 });
    }

    // Simula login válido
    if (email === 'admin@mindev.com' && password === '123456') {
      return NextResponse.json({
        token: 'jwt-fake-minddev-123',
        message: 'Login realizado com sucesso!'
      });
    }

    return NextResponse.json({ message: 'Credenciais inválidas!' }, { status: 401 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 });
  }
}
