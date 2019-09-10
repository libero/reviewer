module.exports = {
  "steps": [
    {
      // step name will be stored in translation file, key is customizable here
      "name_key": "wizard:author_step--label",
      "components": [
        {
          // Labels for input types are set in translation files not this config.
          "id": "author",
          "type": "ORCID_DETAILS",
          "options": {
            "exclude" : [],
            "validation": true
          }
        }
      ]
    },
    {
      "name_key": "wizard:files_step--label",
      "components": [
        {
          "id": "coverLetter",
          "label_key": "wizard:files_step--cover-letter-label",
          "type": "RICH_TEXT_EDITOR",
          "options": {
            "validation": true,
            // If present, gives the block of customizable text before the input block. This should be stored in a translation file.
            "pretext_key": 'coverletter_pretext'
          }
        },
        {
          "id": "manuscriptFile",
          "type": "MANUSCRIPT_UPLOAD",
          "options": {
            "validation": true,
            "supporting_files": {
              "id": "supportingFiles",
              "options": {
                // What should be configurable here? fileSize?
              }
            }
            //What should be configurable here? fileSize?
          }
        }
      ]
    },
    {
      "name_key": "wizard:details_step--label",
      "components": [
        {
          "id": "title",
          "label_key": "wizard:details_step--title-label",
          "type": "EXPANDING_INPUT",
          "options": {
            "validation": {
              // How are we doing this?
            }
          }
        },
        {
          "id": "articleType",
          "label_key": "wizard:details_step--article-type-label",
          "type": "SELECT_INPUT",
          "options": {
            // defaults
            //"searchable": false,
            //"multiple": false,
            "values": [
              { "label_key": "wizard:article_type--research-article", "value": "research_article" },
              { "label_key": "wizard:article_type--short-report", "value": "short_report" },
              { "label_key": "wizard:article_type--tools-resources", "value": "tools_resources" },
              { "label_key": "wizard:article_type--scientific-correspondence", "value": "scientific_correspondence" },
              { "label_key": "wizard:article_type--feature-article", "value": "feature_article" },
            ],
            "validation": {
              // How are we doing this?
            }
          }
        },
        {
          "id": "subjectAreas",
          "label_key": "wizard:details_step--subject-area-label",
          "type": "SELECT_INPUT",
          "options": {
            "searchable": true,
            "multiple": true,
            "values": [
              { "label_key": "wizard:subject_areas--biochemistry-chemical-biology", "value": "biochemistry_chemical_biology" },
              { "label_key": "wizard:subject_areas--cancer-biology", "value": "cancer_biology" },
              { "label_key": "wizard:subject_areas--cell-biology", "value": "cell_biology" },
              { "label_key": "wizard:subject_areas--chromosomes-gene-expression", "value": "chromosomes_gene_expression" },
              { "label_key": "wizard:subject_areas--computational-systems-biology", "value": "computational_systems_biology" },
              { "label_key": "wizard:subject_areas--developmental-biology", "value": "developmental_biology" },
              { "label_key": "wizard:subject_areas--ecology", "value": "ecology" },
              { "label_key": "wizard:subject_areas--epidemiology-global-health", "value": "epidemiology_global_health"},
              { "label_key": "wizard:subject_areas--evolutionary-biology", "value": "evolutionary_biology"},
              { "label_key": "wizard:subject_areas--genetics-genomics", "value": "genetics_genomics"},
              { "label_key": "wizard:subject_areas--human-biology-medicine", "value": "human_biology_medicine"},
              { "label_key": "wizard:subject_areas--immunology-inflammation", "value": "immunology_inflammation"},
              { "label_key": "wizard:subject_areas--microbiology-infectious-disease", "value": "microbiology_infectious_disease" },
              { "label_key": "wizard:subject_areas--neuroscience", "value": "neuroscience" },
              { "label_key": "wizard:subject_areas--physics-living-systems", "value": "physics_living_systems" },
              { "label_key": "wizard:subject_areas--plant-biology", "value": "plant_biology" },
              { "label_key": "wizard:subject_areas--stem-cells-and-regenerative-medicine", "value": "stem_cells_and_regenerative_medicine"},
              { "label_key": "wizard:subject_areas--structural-biology-molecular-biophysics", "value": "structural_biology_molecular_biophysics"},
            ],
            "validation": {
              // How are we doing this?
            }
          }
        },
        {
          "id": "previouslyDiscussed",
          "type": "TOGGLE",
          "label_key": "wizard:details_step--previously-discussed-label",
          "components": [
            {
              "id": "details",
              "label_key": "wizard:details_step--previously-discussed-details-label",
              "type": "MULTILINE_INPUT",
              "options": {
                "validation": {
                  // How are we doing this?
                }
              }
            }
          ]
        },
        {
          "id": "previouslySubmitted",
          "type": "TOGGLE",
          "label_key": "wizard:details_step--previously-submitted-label",
          "components": [
            {
              "id": "details",
              "label_key": "wizard:details_step--previously-submitted-details-label",
              "type": "MULTILINE_INPUT",
              "options": {
                "validation": {
                  // How are we doing this?
                }
              }
            }
          ]
        },
        {
          "id": "cosubmissions",
          "type": "TOGGLE",
          "label_key": "wizard:details_step--cosubmissions-label",
          "components": [
            {
              "id": "first",
              "label_key": "wizard:details_step--first-cosubmissions-label",
              "type": "TEXT_INPUT",
              "options": {
                "validation": {
                  // How are we doing this?
                }
              }
            },
            {
              "id": "second",
              "label_key": "wizard:details_step--second-cosubmissions-label",
              "type": "TEXT_INPUT",
              "options": {
                "validation": {
                  // How are we doing this?
                }
              }
            }
          ]
        }
      ]
    },
    {
      "name_key": 'wizard:editors_step--label',
      "components": [
          {
              "id": 'senior_editors',
              "type": 'PEOPLE_PICKER',
              "options": {
                  "key_prefix": 'senior_editors',
                  "roles": ['senior-editor', 'leadership']
              },
          },
          {
            "id": "excluded_editors",
            "type": "TOGGLE_EXCLUDED",
            "name_key": "wizard:editors_step--excluded-editors-label",
            "toggle_text": "senior editor",
            "components": [
              {
                "id": "selected",
                "type": 'PEOPLE_PICKER',
                "options": {
                    "key_prefix": 'excluded_editors',
                    "roles": ['senior-editor', 'leadership'],
                    "excluded": "senior_editors"
                },
              },
              {
                "id": "reason",
                "label_key": "wizard:editors_step--excluded-editors-reason-label",
                "type": "MULTILINE_INPUT",
                "options": {
                  "validation": {
                    // How are we doing this?
                  }
                }
              }
            ]
          },
          {
              "id": 'reviewing_editor',
              "type": 'PEOPLE_PICKER',
              "options": {
                  "key_prefix": 'reviewing_editor',
                  "roles": ["reviewing-editor"]
              },
          },
          {
            "id": "excluded_reviewing_editor",
            "type": "TOGGLE_EXCLUDED",
            "name_key": "wizard:editors_step--excluded-reviewing-editor-label",
            "toggle_text": "reviewing editor",
            "components": [
              {
                "id": "selected",
                "type": 'PEOPLE_PICKER',
                "options": {
                    "key_prefix": 'excluded_reviewing_editor',
                    "roles": ['reviewing-editor'],
                    "excluded": "reviewing_editor"
                },
              },
              {
                "id": "reason",
                "label_key": "wizard:editors_step--excluded-reviewing-editor-reason-label",
                "type": "MULTILINE_INPUT",
                "options": {
                  "validation": {
                    // How are we doing this?
                  }
                }
              }
            ]
          },
          {
              "id": "sugested_reviewers",
              "label_key": "wizard:editors_step--suggested-reviewers-label",
              "type": "EXPANDING_NAME_EMAIL",
              "options": {
                  "name_label_key": "wizard:editors_step--suggested-reviewers-name-label",
                  "email_label_key": "wizard:editors_step--suggested-reviewers-name-label",
                  "validation": true,
                  "max_rows": 6
              }
          },
          {
            "id": "excluded_reviewers",
            "type": "TOGGLE_EXCLUDED",
            "name_key": "wizard:editors_step--excluded-reviewers-label",
            "toggle_text": "reviewer",
            "components": [
              {
                "id": "reviewers",
                "label_key": "wizard:editors_step--excluded-reviewers-label",
                "type": "EXPANDING_NAME_EMAIL",
                "options": {
                    "name_label_key": "wizard:editors_step--excluded-reviewers-name-label",
                    "email_label_key": "wizard:editors_step--excluded-reviewers-name-label",
                    "validation": true,
                    "max_rows": 2
                }
              },
              {
                "id": "reason",
                "label_key": "wizard:editors_step--excluded-reviewers-reason-label",
                "type": "MULTILINE_INPUT",
                "options": {
                  "validation": {
                    // How are we doing this?
                  }
                }
              }
            ]
          }
      ],
    },
  ]
}