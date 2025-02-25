<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['nullable', 'string', 'max:20', Rule::unique('users')
                ->ignore($this->route('user'))],
            'email' => ['nullable', 'email', Rule::unique('users')
                ->ignore($this->route('user'))],
            'first_name' => ['nullable', 'string', 'max:50'],
            'last_name' => ['nullable', 'string', 'max:50'],
            'phone' => ['nullable', 'string', 'max:20'],
            'role' => ['nullable', 'required_with:facility_id,district_id,partner_id'],
            'facility_id' => ['required_if:role,data collector,facility staff', "string", Rule::exists("facilities", 'id')],
            'district_id' => ['required_if:role,clma', "numeric", Rule::exists("districts", 'id')],
            'partner_id' => ['required_if:role,partner', "string", Rule::exists("partners", 'id')]
        ];
    }
}
