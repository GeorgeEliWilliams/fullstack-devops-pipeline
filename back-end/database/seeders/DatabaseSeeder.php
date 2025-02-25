<?php

namespace Database\Seeders;

use App\Models\StrategiesStatus;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\Forms\BaselineData;
use Database\Seeders\Forms\CommunitySensitizationForm;
use Database\Seeders\Forms\ConsentForm;
use Database\Seeders\Forms\DataVerificationForm;
use Database\Seeders\Forms\ExitInterviewForm;
use Database\Seeders\Forms\FocusGroupDiscussionForm;
use Database\Seeders\Forms\ServiceProviderChecklistForm;
use Database\Seeders\Forms\ServiceProvisionForm;
use Database\Seeders\Forms\ServiceUserAssessmentForm;
use Database\Seeders\Forms\TrainingEvaluationForm;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
                UserTableSeeder::class,
            ]
        );
    }
}
