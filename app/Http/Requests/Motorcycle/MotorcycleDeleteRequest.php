<?php

namespace App\Http\Requests\Motorcycle;

use Illuminate\Foundation\Http\FormRequest;

class MotorcycleDeleteRequest extends FormRequest
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
            "id_motorcycle" => "required|max:200"
        ];
    }
}
