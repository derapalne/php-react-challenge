<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->sentence(20),
            'image_url' => 'images/image-not-found.png',
            'price' => fake()->numberBetween(1000, 5000),
            'category_id' => fake()->numberBetween(1, 4),
            'user_id' => 1,
        ];
    }
}
