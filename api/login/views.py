from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


def set_jwt_cookies(response, access_token, refresh_token):
    """Função auxiliar para injetar os cookies na resposta"""
    # Cookie do Access Token
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # Mude para True em produção (HTTPS)
        samesite="Lax",
        max_age=15 * 60,  # 15 minutos
    )
    # Cookie do Refresh Token
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,  # Mude para True em produção (HTTPS)
        samesite="Lax",
        max_age=7 * 24 * 60 * 60,  # 7 dias
    )
    return response


class CustomTokenObtainPairView(TokenObtainPairView):
    """View de Login que salva os tokens em cookies HttpOnly"""

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Gera os tokens
        data = serializer.validated_data
        access_token = data.get("access")
        refresh_token = data.get("refresh")

        # Cria a resposta limpando o corpo do JSON por segurança
        response = Response(
            {"message": "Login realizado com sucesso"}, status=status.HTTP_200_OK
        )
        return set_jwt_cookies(response, access_token, refresh_token)


class CustomTokenRefreshView(TokenRefreshView):
    """View de Refresh que lê o token do cookie e gera um novo access token"""

    def post(self, request, *args, **kwargs):
        # Pega o refresh token diretamente do cookie
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"error": "Refresh token ausente"}, status=status.HTTP_401_UNAUTHORIZED
            )

        # Injeta o token no corpo dos dados para o serializer do SimpleJWT validar
        serializer = self.get_serializer(data={"refresh": refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
            access_token = serializer.validated_data.get("access")
            # Alguns fluxos também rotacionam o refresh token aqui
            new_refresh = serializer.validated_data.get("refresh", refresh_token)

            response = Response(
                {"message": "Token atualizado"}, status=status.HTTP_200_OK
            )
            return set_jwt_cookies(response, access_token, new_refresh)
        except Exception:
            return Response(
                {"error": "Token inválido ou expirado"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class LogoutView(APIView):
    """View de Logout que deleta os cookies do navegador"""

    def post(self, request):
        response = Response({"message": "Logout realizado"}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
