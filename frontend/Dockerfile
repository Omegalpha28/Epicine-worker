ARG TYPE=development
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
ARG TYPE
RUN if [ "$TYPE" = "development" ]; then \
        npm install; \
    else \
        npm install --only=production && npm run build; \
    fi

FROM builder AS branch-version-development
WORKDIR /app
COPY --from=builder /app /app/
EXPOSE 5555
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]

FROM builder AS branch-version-production
WORKDIR /app
COPY --from=builder /app/dist /app
EXPOSE 5555
CMD [ "npm", "run", "prod", "--", "--host", "0.0.0.0" ]

FROM branch-version-${TYPE} AS final
