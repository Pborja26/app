class JWTFromCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Se houver um cookie de access_token e não houver cabeçalho de autorização explícito
        if (
            "access_token" in request.COOKIES
            and "HTTP_AUTHORIZATION" not in request.META
        ):
            token = request.COOKIES["access_token"]
            # Força o cabeçalho no formato que o SimpleJWT espera
            request.META["HTTP_AUTHORIZATION"] = f"Bearer {token}"

        return self.get_response(request)
