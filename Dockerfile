FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 89
EXPOSE 7654

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["WasGehtAPI/WasGehtAPI.csproj", "WasGehtAPI/"]
RUN dotnet restore "WasGehtAPI/WasGehtAPI.csproj"
COPY . .
WORKDIR "/src/WasGehtAPI"
RUN dotnet build "WasGehtAPI.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "WasGehtAPI.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "WasGehtAPI.dll"]