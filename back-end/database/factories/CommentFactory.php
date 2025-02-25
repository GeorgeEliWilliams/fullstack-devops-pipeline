<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Strategy;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
//        $strategyUuid = "567b2e03-e494-3bc1-84bc-82381f5e26b2";
//        //dd($strategyUuid['id']);

        return [
            'id' => $this->faker->uuid,
            'comment' => $this->faker->sentence(),  // Generates a short random sentence as a comment
            'strategy_id' => Strategy::inRandomOrder()->first()->id ?? Strategy::factory()->create()->id,
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed', 'delayed', 'dropped']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
