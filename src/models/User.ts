// import { supabase } from '../config/database';
// import { User, CreateUserRequest } from '../interface/User';

// export class UserModel {
//   static async getAll(): Promise<User[]> {
//     const { data, error } = await supabase
//       .from('users')
//       .select('*');
    
//     if (error) throw error;
//     return data || [];
//   }

//   static async getById(id: string): Promise<User | null> {
//     const { data, error } = await supabase
//       .from('users')
//       .select('*')
//       .eq('id', id)
//       .single();
    
//     if (error) throw error;
//     return data;
//   }

//   static async create(userData: CreateUserRequest): Promise<User> {
//     const { data, error } = await supabase
//       .from('users')
//       .insert([userData])
//       .select()
//       .single();
    
//     if (error) throw error;
//     return data;
//   }
// }