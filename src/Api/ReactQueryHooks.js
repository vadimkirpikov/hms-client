import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import * as api from "./ApiClient";

export const useCreateEntity = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ entity, entityDto }) => api.createEntity(entity, entityDto),
        {
            onSuccess: async (data, variables) => {
                console.log(data);
                await queryClient.invalidateQueries((query) => query.queryKey[0] === variables.entity);
            },
            onError: (error, variables) => {
                console.error(`Failed to create entity ${variables.entity}, ${JSON.stringify(variables.entityDto)}`);
            }
        }
    );
};
export const useReadEntities = ({entity, filter, order}) => {
    return useQuery({queryKey: [entity, filter, order], queryFn: () => api.readEntities(entity, filter, order)});
};
export const useUpdateEntity = () => {
    const queryClient = useQueryClient();
    return useMutation(({entity, id, entityDto})=> api.updateEntity(entity, id, entityDto), {
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries((query) => query.queryKey[0] === variables.entity);
        }
    });
}
export const useDeleteEntity = () => {
    const queryClient = useQueryClient();
    return useMutation(({entity, id}) => {
        return api.deleteEntity(entity, id);
    }, {
        onSuccess: async (data, variables) => {
            console.log(data);
            await queryClient.invalidateQueries((query) => query.queryKey[0] === variables.entity);
        },
        onError:  (error, variables) => {
            console.error(`Failed to delete entity ${variables.entity}, ${variables.id}`);
        }
    })
}
