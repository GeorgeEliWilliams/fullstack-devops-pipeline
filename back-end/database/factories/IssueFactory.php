<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Issue>
 */
class IssueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid,
            'name' => $this->faker->sentence(3),
            'facility_id' => $this->faker->uuid, // Assumes 'facility_id' is a UUID. You may link it to a Facility factory if one exists.
            'root_cause' => $this->faker->paragraph(),
            'advocacy_focus' => $this->faker->sentence(),
            'target_beneficiaries' => $this->faker->words(3, true),
            'status' => 'tracked',
            'baseline' => $this->faker->paragraph(),
            'number' => $this->faker->optional()->randomNumber(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
