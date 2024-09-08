<?php

namespace App\Http\Requests\Motorcycle;

use Illuminate\Foundation\Http\FormRequest;

class MotorcycleUpdateRequest extends FormRequest
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
            "id_motorcycle" => "required|max:200",
            "name" => "required|max:200",
            "type_motorcycle" => "required|max:200",
            "merk_motorcycle" => "required|max:200",
            "cc" => "required|max:200",
            "color" => "required|max:200",
            "price" => "required|max:200",
            "date_launching" => "date|required|max:200",
        ];
    }
}
