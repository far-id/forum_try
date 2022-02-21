<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class ThreadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'category_id' => rand(1, 5),
            'title' => $title = Str::title($this->faker->sentence()),
            'slug' => Str::slug($title . '-' . Str::random(4)),
            'body' => $this->faker->paragraphs(rand(3, 7), true),
        ];
    }
}
