import os
import warnings
from langchain.llms import OpenAI
import json
from dotenv import load_dotenv

class OpenAIModel:

    def get_model(self, model_name):
        try:
            load_dotenv(os.path.join(os.getcwd(), 'ailearn-ai/.env'))
            if os.getenv("OPENAI_API_KEY"):
                with warnings.catch_warnings():
                    warnings.simplefilter("ignore")
                    model = OpenAI(model_name=model_name, temperature=0.2, streaming=False)
                    print(f"Succesfully loaded model {model_name}")
                    return model
            else:
                print("FATAL ERROR: OPENAI_API_KEY not set")
                return lambda x: "[]" # return empty list
        except Exception as e:
            print(f"Error loading model {model_name}: {e}")
            return lambda x: "[]"

    def prompt_llm(self, request, output_format, llm):
        prompt = f"""
            Eres un excelente y creativo profesor utilizado para la generación automatizada de cursos de todo tipo. Responde siempre JSON válido

            Request: {request}

            Output_format: {output_format}

            Output:
            """
        
        response = llm(prompt)
        print(f"Response: {response}")
        
        return response







