module.exports = {
    steps: [
        {
            // step name will be stored in translation file, key is customizable here
            nameKey: 'wizard:author_step--label',
            path: 'author',
            components: [
                {
                    // Labels for input types are set in translation files not this config.
                    id: 'author',
                    type: 'ORCID_DETAILS',
                    options: {
                        exclude: [],
                        validation: true,
                    },
                },
            ],
        },
        {
            nameKey: 'wizard:files_step--label',
            path: 'files',
            components: [
                {
                    id: 'coverLetter',
                    labelKey: 'wizard:files_step--cover-letter-label',
                    type: 'RICH_TEXT_EDITOR',
                    options: {
                        validation: true,
                        // If present, gives the block of customizable text before the input block. This should be stored in a translation file.
                        descriptionKey: 'coverletter_description',
                    },
                },
                {
                    id: 'manuscriptFile',
                    type: 'MANUSCRIPT_UPLOAD',
                    options: {
                        validation: true,
                        supportingFiles: {
                            id: 'supportingFiles',
                            options: {
                                // What should be configurable here? fileSize?
                            },
                        },
                        //What should be configurable here? fileSize?
                    },
                },
            ],
        },
        {
            nameKey: 'wizard:details_step--label',
            path: 'details',
            components: [
                {
                    id: 'title',
                    labelKey: 'wizard:details_step--title-label',
                    type: 'EXPANDING_INPUT',
                    options: {
                        validation: {
                            // How are we doing this?
                        },
                    },
                },
                {
                    id: 'articleType',
                    labelKey: 'wizard:details_step--article-type-label',
                    type: 'SELECT_INPUT',
                    options: {
                        // defaults
                        //"searchable": false,
                        //"multiple": false,
                        values: [
                            { labelKey: 'wizard:article_type--research-article', value: 'research_article' },
                            { labelKey: 'wizard:article_type--short-report', value: 'short_report' },
                            { labelKey: 'wizard:article_type--tools-resources', value: 'tools_resources' },
                            {
                                labelKey: 'wizard:article_type--scientific-correspondence',
                                value: 'scientific_correspondence',
                            },
                            { labelKey: 'wizard:article_type--feature-article', value: 'feature_article' },
                        ],
                        validation: {
                            // How are we doing this?
                        },
                    },
                },
                {
                    id: 'subjectAreas',
                    labelKey: 'wizard:details_step--subject-area-label',
                    type: 'SELECT_INPUT',
                    options: {
                        searchable: true,
                        multiple: true,
                        values: [
                            {
                                labelKey: 'wizard:subject_areas--biochemistry-chemical-biology',
                                value: 'biochemistry_chemical_biology',
                            },
                            {
                                labelKey: 'wizard:subject_areas--cancer-biology',
                                value: 'cancer_biology',
                            },
                            { labelKey: 'wizard:subject_areas--cell-biology', value: 'cell_biology' },
                            {
                                labelKey: 'wizard:subject_areas--chromosomes-gene-expression',
                                value: 'chromosomes_gene_expression',
                            },
                            {
                                labelKey: 'wizard:subject_areas--computational-systems-biology',
                                value: 'computational_systems_biology',
                            },
                            {
                                labelKey: 'wizard:subject_areas--developmental-biology',
                                value: 'developmental_biology',
                            },
                            {
                                labelKey: 'wizard:subject_areas--ecology',
                                value: 'ecology',
                            },
                            {
                                labelKey: 'wizard:subject_areas--epidemiology-global-health',
                                value: 'epidemiology_global_health',
                            },
                            {
                                labelKey: 'wizard:subject_areas--evolutionary-biology',
                                value: 'evolutionary_biology',
                            },
                            {
                                labelKey: 'wizard:subject_areas--genetics-genomics',
                                value: 'genetics_genomics',
                            },
                            {
                                labelKey: 'wizard:subject_areas--human-biology-medicine',
                                value: 'human_biology_medicine',
                            },
                            {
                                labelKey: 'wizard:subject_areas--immunology-inflammation',
                                value: 'immunology_inflammation',
                            },
                            {
                                labelKey: 'wizard:subject_areas--microbiology-infectious-disease',
                                value: 'microbiology_infectious_disease',
                            },
                            {
                                labelKey: 'wizard:subject_areas--neuroscience',
                                value: 'neuroscience',
                            },
                            {
                                labelKey: 'wizard:subject_areas--physics-living-systems',
                                value: 'physics_living_systems',
                            },
                            {
                                labelKey: 'wizard:subject_areas--plant-biology',
                                value: 'plant_biology',
                            },
                            {
                                labelKey: 'wizard:subject_areas--stem-cells-and-regenerative-medicine',
                                value: 'stem_cells_and_regenerative_medicine',
                            },
                            {
                                labelKey: 'wizard:subject_areas--structural-biology-molecular-biophysics',
                                value: 'structural_biology_molecular_biophysics',
                            },
                        ],
                        validation: {
                            // How are we doing this?
                        },
                    },
                },
                {
                    id: 'previouslyDiscussed',
                    type: 'TOGGLE',
                    labelKey: 'wizard:details_step--previously-discussed-label',
                    components: [
                        {
                            id: 'details',
                            labelKey: 'wizard:details_step--previously-discussed-details-label',
                            type: 'MULTILINE_INPUT',
                            options: {
                                validation: {
                                    // How are we doing this?
                                },
                            },
                        },
                    ],
                },
                {
                    id: 'previouslySubmitted',
                    type: 'TOGGLE',
                    labelKey: 'wizard:details_step--previously-submitted-label',
                    components: [
                        {
                            id: 'details',
                            labelKey: 'wizard:details_step--previously-submitted-details-label',
                            type: 'MULTILINE_INPUT',
                            options: {
                                validation: {
                                    // How are we doing this?
                                },
                            },
                        },
                    ],
                },
                {
                    id: 'cosubmissions',
                    type: 'TOGGLE',
                    labelKey: 'wizard:details_step--cosubmissions-label',
                    components: [
                        {
                            id: 'first',
                            labelKey: 'wizard:details_step--first-cosubmissions-label',
                            type: 'TEXT_INPUT',
                            options: {
                                validation: {
                                    // How are we doing this?
                                },
                            },
                        },
                        {
                            id: 'second',
                            labelKey: 'wizard:details_step--second-cosubmissions-label',
                            type: 'TEXT_INPUT',
                            options: {
                                validation: {
                                    // How are we doing this?
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            nameKey: 'wizard:editors_step--label',
            path: 'editors',
            components: [
                {
                    id: 'senior_editors',
                    type: 'PEOPLE_PICKER',
                    options: {
                        keyPrefix: 'senior_editors',
                        roles: ['senior-editor', 'leadership'],
                    },
                },
                {
                    id: 'excluded_editors',
                    type: 'TOGGLE_EXCLUDED',
                    nameKey: 'wizard:editors_step--excluded-editors-label',
                    toggleText: 'senior editor',
                    components: [
                        {
                            id: 'selected',
                            type: 'PEOPLE_PICKER',
                            options: {
                                keyPrefix: 'excluded_editors',
                                roles: ['senior-editor', 'leadership'],
                                excluded: 'senior_editors',
                            },
                        },
                        {
                            id: 'reason',
                            labelKey: 'wizard:editors_step--excluded-editors-reason-label',
                            type: 'MULTILINE_INPUT',
                            options: {
                                validation: {
                                    // How are we doing this?
                                },
                            },
                        },
                    ],
                },
                {
                    id: 'reviewing_editor',
                    type: 'PEOPLE_PICKER',
                    options: {
                        keyPrefix: 'reviewing_editor',
                        roles: ['reviewing-editor'],
                    },
                },
                {
                    id: 'excluded_reviewing_editor',
                    type: 'TOGGLE_EXCLUDED',
                    nameKey: 'wizard:editors_step--excluded-reviewing-editor-label',
                    toggleText: 'reviewing editor',
                    components: [
                        {
                            id: 'selected',
                            type: 'PEOPLE_PICKER',
                            options: {
                                keyPrefix: 'excluded_reviewing_editor',
                                roles: ['reviewing-editor'],
                                excluded: 'reviewing_editor',
                            },
                        },
                        {
                            id: 'reason',
                            labelKey: 'wizard:editors_step--excluded-reviewing-editor-reason-label',
                            type: 'MULTILINE_INPUT',
                            options: {
                                validation: {
                                    // How are we doing this?
                                },
                            },
                        },
                    ],
                },
                {
                    id: 'sugested_reviewers',
                    labelKey: 'wizard:editors_step--suggested-reviewers-label',
                    type: 'EXPANDING_NAME_EMAIL',
                    options: {
                        nameLabelKey: 'wizard:editors_step--suggested-reviewers-name-label',
                        emailLabelKey: 'wizard:editors_step--suggested-reviewers-name-label',
                        validation: true,
                        maxRows: 6,
                    },
                },
                {
                    id: 'excluded_reviewers',
                    type: 'TOGGLE_EXCLUDED',
                    nameKey: 'wizard:editors_step--excluded-reviewers-label',
                    toggleText: 'reviewer',
                    components: [
                        {
                            id: 'reviewers',
                            labelKey: 'wizard:editors_step--excluded-reviewers-label',
                            type: 'EXPANDING_NAME_EMAIL',
                            options: {
                                nameLabelKey: 'wizard:editors_step--excluded-reviewers-name-label',
                                emailLabelKey: 'wizard:editors_step--excluded-reviewers-name-label',
                                validation: true,
                                maxRows: 2,
                            },
                        },
                        {
                            id: 'reason',
                            labelKey: 'wizard:editors_step--excluded-reviewers-reason-label',
                            type: 'MULTILINE_INPUT',
                            options: {
                                validation: {
                                    // How are we doing this?
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            nameKey: 'wizard:disclosure_step--label',
            path: 'disclosure',
            components: [
                {
                    id: 'acknowledgment',
                    type: 'ACKNOWLEDGMENT',
                    nameKey: 'wizard:disclosure_step--acknowledgment-label',
                    options: {
                        showTitle: true,
                        showAuthorName: true,
                        showTypeAndDate: true,
                        textBlockKey: 'wizard:disclosure_step--acknowledgment-text',
                        textInputs: [
                            {
                                id: 'name',
                                labelKey: 'wizard:disclosure_step--acknowledgment-name-label',
                                options: {
                                    validation: {
                                        // How will we do this?
                                    },
                                },
                            },
                        ],
                        checkBoxes: [
                            {
                                id: 'consent',
                                labelKey: 'wizard:disclosure_step--disclosure-consent-label',
                                options: {
                                    validation: {
                                        // How will we do this?
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
        },
    ],
};
